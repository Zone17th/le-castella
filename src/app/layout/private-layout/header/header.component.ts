import {Component, OnInit} from '@angular/core';
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth-service/auth.service";
import {CartService} from "../../../services/cart-service/cart.service";
import {ProductService} from "../../../services/product-service/product.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  confirmModal?: NzModalRef; // For testing by now
  token: any;
  userName!: string;
  isVisible = false;
  cartModalData : any[] = [];

  constructor(private modal: NzModalService,
              private _cartService: CartService,
              private _productService: ProductService,
              private _authService: AuthService,
              private _router: Router) {
  }
  ngOnInit(): void {
    this.token = localStorage.getItem('accessToken');
    // this.userName = localStorage.getItem('userName') || '';
    this.userName = this.createUserName(localStorage.getItem('userName') || '');
  }

  showConfirm(): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Are you leaving?',
      nzContent: 'Are you sure you want to logout?',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOnOk: () =>
        this._authService.logout().subscribe({
          next: (resp) => {
            localStorage.clear();
            this._router.navigate(['/auth/login']).then(() => this.logout());
          },
          error : (error) => {
            console.error('Logout failed:', error);
          }
        }),
      nzCancelText: 'No, please take me back',
    });
  }

  createUserName(userName: string) {
    const arrStr = userName.split(' ');
    let newName = '';
    arrStr.forEach(str => {
      newName += str.charAt(0).toUpperCase();
    })
    return newName;
  }

  handleOk() {
    this._router.navigateByUrl("/admin/order/create").then(() => this.isVisible = false);
  }
  cancelModal() {
    this._router.navigateByUrl("/admin/product").then(() => this.isVisible = false);
  }
  resetCart() {
    const newCartData = {
      product: [],
      totalItem: 0
    };
    this._cartService.updateCartData(newCartData);
  }
  logout() {
    this.resetCart();
    this._authService.logout().subscribe({
      next: resp => {console.log("logout success")},
      error: err => {console.error(err)}
    })
  }

  generateModal() {
    let strData = this.convertCartToString();
    if (!strData) {
      this.isVisible = true;
      return;
    }
    this._productService.getCartProduct(strData).subscribe({
      next: resp => {
        this.cartModalData = resp;
      }, error: err => {
        console.error(err)
      }
    });
    this.isVisible = true;
  }

  get totalItems() {
    return this._cartService.getCartTotalItems();
  }
  convertCartToString() {
    let cartList = this._cartService.getCartData().product;
    return cartList?.map((item: any) => {
      return `${item.id}_${item.quantity}`
    }).join('#') || '';
  }
}
