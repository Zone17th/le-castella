import {Component, OnDestroy, OnInit} from '@angular/core';
import {finalize, Subject, takeUntil} from "rxjs";
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {AuthService} from "../../services/auth-service/auth.service";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {ProductService} from "../../services/product-service/product.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzModalService} from "ng-zorro-antd/modal";
import {vi_VN} from "ng-zorro-antd/i18n";
import {LoadImage} from "../../environment/load-image";
import {CartService} from "../../services/cart-service/cart.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  productList: any[] = [];
  searchOptions: string = '';
  dataLoaded = false;
  role: string = '';
  page: number = 0;
  size: number = 5;
  totalElements: number = 0;
  isEdit: boolean = false;
  dataForm!: FormGroup;
  id!: number;
  productDetail! : any;
  isSubmittingForm = false;
  dataModal! : any;
  productModalShow = false;
  constructor(private _fb: FormBuilder,
              private _productService: ProductService,
              private _activatedRoute : ActivatedRoute,
              private _router: Router,
              private _cartService: CartService,
              private _authService: AuthService,
              private _notification : NzNotificationService,
              private _modal: NzModalService,
  ) {
  }

  ngOnInit(): void {
    this.isEdit = false;
    this._activatedRoute.queryParams.subscribe(params => {
      this.page = Number(params['page']) || 0;
      this.size = Number(params['size']) || 10;
      this.searchOptions = params['query'] || '';
    });
    this.loadData();
    this.dataForm = this._fb.group({
      id: [this.id || ''],
      name: [this.productDetail?.name || '', [Validators.required]],
      sizeS: [this.productDetail?.price || ''],
      sizeM: [this.productDetail?.price || ''],
      sizeL: [this.productDetail?.price || ''],
      sizeXL: [this.productDetail?.price || ''],
    });
  }

  search() {
    this.reGenerateUrl();
    this.loadData();
  }

  loadData() {
    this._productService.getProductList(this.searchOptions, this.page, this.size).pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: res => {
        this.productList = res.content;
        this.totalElements = res.totalElements;
        this.dataLoaded = true;
      },
      error: error => {

      }
    });
  }
  reGenerateUrl() {
    const navigationExtras: NavigationExtras = {
      queryParams: {query: this.searchOptions, page: this.page, size: this.size}
    };
    this._router.navigate([], navigationExtras);
  }

  paging(newPage: number) {
    this.page = newPage - 1;
    this.reGenerateUrl();
    this.loadData();
  }

  delete(id: number): void {
    this._productService.deleteProduct(id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {
          this.createNotification('success', 'Success deleted!', '');
          this.loadData();
        },
        error: error => {
          if (error.status == 400) {
            this._notification.error('', error.error);
          }
        }
      });
  }
  editProduct(id: number) {
    this._productService.getProductDetail(id).pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: res => {
        this.id = id;
        this.productDetail = res;
        this.dataForm.get('id')?.setValue(this.productDetail.id);
        this.dataForm.get('name')?.setValue(res?.name);
        this.dataForm.get('sizeS')?.setValue(res?.subProducts[0]?.price || '');
        this.dataForm.get('sizeM')?.setValue(res?.subProducts[1]?.price || '');
        this.dataForm.get('sizeL')?.setValue(res?.subProducts[2]?.price || '');
        this.dataForm.get('sizeXL')?.setValue(res?.subProducts[3]?.price || '');
        this.isEdit = true;
      },
      error: error => {

      }
    });
  }
  createProduct() {
    if (this.validateFormData()) {
      this.isSubmittingForm = true;
      this._productService.postProduct(this.dataForm.value)
        .pipe(finalize(() => this.isSubmittingForm = false))
        .subscribe({
          next: res => {
            this._notification.success('Congratulation!', 'Create Product successful')
            this.dataForm.reset();
            this.loadData();
          },
          error: err => {
            console.log(err);
            if (err.status == 400) {
              this._notification.error('', err.error);
            }
          }
        });
    }
  }
  updateProduct() {
    if (this.validateFormData()) {
      this.isSubmittingForm = true;
      this._productService.putProduct(this.dataForm.value)
        .pipe(finalize(() => this.isSubmittingForm = false))
        .subscribe({
          next: res => {
            this._notification.success('Congratulation!', 'Update Product successful');
            this.dataForm.reset();
            this.isEdit = false;
            this.loadData();
          },
          error: err => {
            if (err.status == 400) {
              this._notification.error('', err.error);
            }
          }
        });
    }
  }
  submit() {
    if (!this.isEdit) {
      this.createProduct();
    } else {
      this.updateProduct();
    }
  }
  cancel() {
    this.isEdit = false;
    this.dataForm.reset();
  }
  createNotification(type: string, title: string, message: string): void {
    this._notification.create(
      type,
      title, message
    );
  }
  validateFormData() {
    this.dataForm.get('id')?.setValue(this.id || null);
    if (this.dataForm.invalid) {
      Object.values(this.dataForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });
      return false;
    }
    return true;
  }
  showDeleteConfirm(event: number): void {
    this._modal.confirm({
      nzTitle: 'Delete Product',
      nzContent: '<b >Are you sure delete this product?</b> </br>' +
        '<p style="color: red"> This action is permanent and cannot be undone!</>',
      nzOkText: 'Delete',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.delete(event),
      nzCancelText: 'No, please take me back',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getListSubId() {
    let list = this._cartService.getCartData();
    return list?.product?.map((item : any) => { return item.id}) || [];
  }
  showModal(data: any) {
    this.productModalShow= true;
    this.dataModal = data;
  }
  handleOk() {
    this.productModalShow = false;
  }
  cancelModal() {
    this.productModalShow = false;
  }
  displayQuantity(id : number) {
    return this._cartService.displayQuantity(id);
  }
  addToCart(id: number) {
    this._cartService.addToCart(id);
  }
  minusFromCart(id: number) {
    this._cartService.minusFromCart(id);
  }
  protected readonly LoadImage = LoadImage;
}
