import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth-service/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  validateForm!: UntypedFormGroup;
  inputUsernameTouched: boolean = false;
  inputPasswordTouched: boolean = false;
  errorMessage!: string;
  passwordVisibleConfirm = false;

  constructor(private fb: UntypedFormBuilder,
              private _router: Router,
              private _authService: AuthService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]

    });
    // Theo dõi sự kiện focus của ô input
    this.username?.valueChanges.subscribe(() => {
      this.inputUsernameTouched = true;
    });
    this.password?.valueChanges.subscribe(() => {
      this.inputPasswordTouched = true;
    });
  }
  submitForm(): void {
    this.inputUsernameTouched = true;
    this.inputPasswordTouched = true;
    if (this.validateForm.invalid) {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
    this._authService.login(this.validateForm.value).subscribe({
      next: response => {
        localStorage.setItem('userName', response.username);
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('role', response.role);
        const returnUrl = localStorage.getItem('returnUrl');
        if (!returnUrl) {
          this._router.navigate(['/admin/product']);
        } else {
          this._router.navigateByUrl(returnUrl).then(r => localStorage.removeItem('returnUrl'));
        }
      },
      error: error => {
        this.errorMessage = "Either email address or password is incorrect. Please try again!"
      }
    });
  }
  get username() { return this.validateForm.get('username'); }
  get password() { return this.validateForm.get('password'); }
}
