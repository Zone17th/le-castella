import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {NzModalService} from "ng-zorro-antd/modal";
import {StaffService} from "../../../services/staff-service/staff.service";
import {finalize} from "rxjs";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {StoreService} from "../../../services/store-service/store.service";

@Component({
  selector: 'app-staff-form',
  templateUrl: './staff-form.component.html',
  styleUrls: ['./staff-form.component.scss']
})
export class StaffFormComponent implements OnInit {
  @Input() readonly: boolean = false;
  @Input() edit: boolean = true;
  @Input() staffData!: any;
  staffForm!: FormGroup;
  id! : number;
  storeList : any[] = [];
  isSubmittingForm : boolean = false;
  passwordRequired : boolean = false;
  passwordVisible: boolean = false;

  @ViewChild('password') password!: ElementRef;

  constructor(private _fb: FormBuilder,
              private _router: Router,
              private _modal: NzModalService,
              private _staffService: StaffService,
              private _storeService: StoreService,
              private _notification: NzNotificationService,
  ) { }

  ngOnInit(): void {
    this.loadStore();
    this.staffForm = this._fb.group({
      id: [this.staffData?.id || this.id || null],
      username: [this.staffData?.username || '', [Validators.required]],
      fullName: [this.staffData?.fullName || '', [Validators.required]],
      password: [''],
      store: [this.staffData?.store?.id || '', [Validators.required]],
    });
  }

  resetForm() {
    this._router.navigateByUrl("/admin/staff").then(() => this.staffForm.reset());
  }

  showDeleteConfirm() {
    this._modal.confirm({
      nzTitle: 'Delete staff',
      nzContent: '<b >Are you sure delete this staff?</b> </br>' +
        '<p style="color: red"> This action is permanent and cannot be undone!</>',
      nzOkText: 'Delete',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteForm(),
      nzCancelText: 'No, please take me back',
      nzOnCancel: () => console.log('Cancel')
    });
  }
  loadStore() {
    this._storeService.getAllStore()
      .subscribe({
        next: res => {
          this.storeList = res;
          console.log(this.storeList);
        },
        error: err => {
        }
      });
  }
  deleteForm() {
    this.id = this.staffData!.id
    this._staffService.deleteStaff(this.id)
      .pipe(finalize(() => this.isSubmittingForm = false))
      .subscribe({
        next: res => {
          this._router.navigateByUrl('/admin/staff')
            .then(() => this._notification.success('', 'You have deleted a school'));
        },
        error: err => {
          if (err.status == 400) {
            this._notification.error('', err.error);
          }
        }
      });
  }
  submitForm(event : string) {
    if (event === 'create') {
      this.postForm();
    } else {
      this.putForm();
    }
  }

  putForm() {
    if (this.validateFormData()) {
      this.isSubmittingForm = true;
      this._staffService.updateStaff(this.staffForm.value)
        .pipe(finalize(() => this.isSubmittingForm = false))
        .subscribe({
          next: res => {
            this._router.navigateByUrl('/admin/staff')
              .then(() => this._notification.success('Congratulation!', 'Update staff successfully.'));
          },
          error: err => {
            if (err.status == 400) {
              this._notification.error('', err.error);
            }
          }
        });
    }
  }

  postForm(): void {
    let check = this.validateFormData();
    this.passwordValidator();

    if (check && !this.passwordRequired) {
      this.isSubmittingForm = true;
      this._staffService.createStaff(this.staffForm.value)
        .pipe(finalize(() => this.isSubmittingForm = false))
        .subscribe({
          next: res => {
            this._router.navigateByUrl('/admin/staff')
              .then(() => this._notification.success('Congratulation!', 'Create staff successfully.'));
          },
          error: err => {
            if (err.status == 400) {
              this._notification.error('', err.error);
            }
          }
        });
    }
  }

  validateFormData() {
    this.staffForm.get('id')?.setValue(this.id || null);
    if (this.staffForm.invalid) {
      Object.values(this.staffForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });
      return false;
    }
    return true;
  }

  passwordValidator() {
    const password = this.password.nativeElement.value;
    if (!password) {
      this.passwordRequired = true;
    } else {
      this.passwordRequired = false;
    }
  }
}
