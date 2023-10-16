import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../../services/product-service/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../services/auth-service/auth.service";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {NzModalService} from "ng-zorro-antd/modal";
import {ProfileService} from "../../../services/profile-service/profile.service";
import {finalize, Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  private unsubscribe$: Subject<void> = new Subject<void>();
  profileForm! : FormGroup;
  passwordForm! : FormGroup;
  username! : string;
  fullName! : string;
  isChangePassword : boolean = false;
  isSubmitProfile: boolean = false;
  isSubmitPassword: boolean = false;
  mismatchPassword : boolean = false;
  passwordVisibleOld = false;
  passwordVisibleNew = false;
  passwordVisibleConfirm = false;

  @ViewChild('newPasswordField') newPasswordField!: ElementRef;
  @ViewChild('confirmPasswordField') confirmPasswordField!: ElementRef;

  constructor(private _fb: FormBuilder,
              private _authService: AuthService,
              private _profileService: ProfileService,
              private _notification : NzNotificationService,
  ) { }

  ngOnInit(): void {
    this.profileForm = this._fb.group({
      username: [this.username || '', [Validators.required]],
      fullName: [this.fullName || '', [Validators.required]],
    });
    this.loadProfile();
  }
  submitProfileForm() {
    if (this.validateForm(this.profileForm)) {
      this.isSubmitProfile = true;
      this._profileService.updateProfile(this.profileForm.value)
        .pipe(finalize(() => this.isSubmitProfile = false))
        .subscribe({
          next: res => {
            this._notification.success('Congratulation!', 'Update Profile successful!')
            this.loadProfile();
          },
          error: err => {
            if (err.status == 400) {
              this._notification.error('', err.error);
            }
          }
        });
    }
  }

  loadProfile() {
    this._profileService.getProfile().pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: res => {
        this.username = res.username;
        this.fullName = res.fullName;
        this.profileForm.get('username')?.setValue(this.username || '');
        this.profileForm.get('fullName')?.setValue(this.fullName || '');
      },
      error: error => {

      }
    });
  }

  reset() {
    this.loadProfile();
  }

  chooseChange() {
    this.isChangePassword = true;
    this.passwordForm = this._fb.group({
      oldPassword: [ '', [Validators.required]],
      newPassword: [ '', [Validators.required]],
      confirmPassword: [ '', [Validators.required]],
    });
  }
  submitPasswordForm() {
    if (this.validateForm(this.passwordForm)) {
      this.isSubmitPassword = true;
      this._profileService.changePassword(this.passwordForm.value)
        .pipe(finalize(() => this.isSubmitPassword = false))
        .subscribe({
          next: res => {
            this._notification.success('Congratulation!', 'Change Password successful!')
            this.isChangePassword = false;
          },
          error: err => {
            if (err.status == 400) {
              this._notification.error('', err.error);
            }
          }
        });
    }
  }

  cancelChange() {
    this.passwordForm.reset();
    this.isChangePassword = false;
  }

  validateForm(form : FormGroup) {
    this.validatePasswordMatch();
    if (this.mismatchPassword) {
      return false;
    }
    if (form.invalid) {
      Object.values(form.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });
      return false;
    }
    return true;
  }
  validatePasswordMatch() {
    const newPassword = this.newPasswordField?.nativeElement?.value;
    const confirmPassword = this.confirmPasswordField?.nativeElement?.value;
    this.mismatchPassword = newPassword !== confirmPassword;
  }
}
