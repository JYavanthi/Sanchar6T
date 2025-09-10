import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormValidationService } from '../../services/form-validation.service';
import { API_URLS } from '../../shared/API-URLs'
import { ApiConverterService } from '../../services/api-converter.service';
import { HttpServiceService } from '../../services/http-service.service';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrl: './login-signup.component.scss'
})
export class LoginSignupComponent {
  isPasswordVisible: boolean = false;
  showError: boolean = false;
  loginSignupForm: any;
  isLogin: boolean = true;
  isEmail: boolean = false;
  isPhone: boolean = true;
  getOTP: boolean = false;
  showOTPInput: boolean = false;
  constructor(private fb: FormBuilder, private httpSer: HttpServiceService, private formValidation: FormValidationService, private authService: AuthService, private router: Router, public apiConverterService: ApiConverterService) {
    this.formInit();
  }

  toggleSignUpLogin(value: string) {
    this.clearInputs();
    value == "Sign Up" ? this.isLogin = false : this.isLogin = true;
  }

  clearInputs() {
    this.loginSignupForm.patchValue({
      Fname: '',
      Mname: '',
      Lname: '',
      email: '',
      password: '',
      phoneNumber: null,
      gender: ''
      // otp: null
    })
  }

  formInit() {
    this.loginSignupForm = this.fb.group({
      Fname: ['', Validators.required],
      Mname: [''],
      Lname: ['', Validators.required],
      email: [''],
      phoneNumber: [null],
      password: ['', [Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)]],
      // otp: [null],
      gender: ['', Validators.required]
    })
  }

  get passwordControl() {
    return this.loginSignupForm.get('password');
  }

  Submit(value: string) {
    if (value == 'Sign in') {
      if (this.isEmail) {
        if (!this.loginSignupForm.controls['email'].value) {
          this.formValidation.showAlert('Email is Required!', 'danger');
          return;
        }
        if (!this.isValidEmail(this.loginSignupForm.controls['email'].value)) {
          this.formValidation.showAlert('Please Enter Valid Email!', 'danger');
          return;
        }
      }
      if (this.isPhone) {
        if (!this.loginSignupForm.controls['phoneNumber'].value) {
          this.formValidation.showAlert('Phone Number is Required!', 'danger');
          return;
        }
        if (this.loginSignupForm.controls['phoneNumber'].value?.length !== 10) {
          this.formValidation.showAlert('Enter 10-digits Phone Number!', 'danger');
          return;
        }
      }
      if (!this.loginSignupForm.controls['password'].value) {
        this.formValidation.showAlert('Password is Required!', 'danger');
        return;
      }
      if (!this.loginSignupForm.controls['password'].valid) {
        this.formValidation.showAlert('Enter Valid Password!', 'danger');
        return;
      }
      const loginData = {
        "mobileNo": this.loginSignupForm.controls['phoneNumber'].value || 'string',
        "email": this.loginSignupForm.controls['email'].value || 'string',
        "password": this.loginSignupForm.controls['password'].value
      };
      this.authService.login(loginData).subscribe({
        next: (res) => {
          debugger
          this.formValidation.showAlert('Login Successful!', 'success');
          // localStorage.setItem('keyName', JSON.stringify(yourData))
        },
        error: () => {
          this.formValidation.showAlert('Invalid credentials!', 'danger');
        }
      });
    }
    else if (value == 'Sign Up') {
      if (!this.formValidation.validateForm(this.loginSignupForm)) {
        this.loginSignupForm.markAllAsTouched();
        setTimeout(() => { }, 0);
        return;
      }

      if (!this.isValidEmail(this.loginSignupForm.controls['email'].value) && !this.loginSignupForm.controls['phoneNumber'].value) {
        this.formValidation.showAlert('Please fill in either Email or Phone Number', 'danger');

        if (this.loginSignupForm.controls['email'].value) {
          if (!this.isValidEmail(this.loginSignupForm.controls['email'].value)) {
            this.formValidation.showAlert('Please Enter Valid Email!', 'danger');
            return;
          }
        }
        return;
      }

      if (this.loginSignupForm.controls['phoneNumber'].value) {
        if (this.loginSignupForm.controls['phoneNumber'].value?.length !== 10) {
          this.formValidation.showAlert('Enter 10-digits Phone Number!', 'danger');
          return;
        }
      }

      if (!this.loginSignupForm.controls['password'].value) {
        this.formValidation.showAlert('Password is Required!', 'danger');
        return;
      }

      const param = {
        "flag": "I",
        "userID": 0,
        "userType": 2,
        "status": "true",
        "password": this.loginSignupForm.controls['password'].value,
        "firstName": this.loginSignupForm.controls['Fname'].value,
        "middleName": this.loginSignupForm.controls['Mname'].value,
        "lastName": this.loginSignupForm.controls['Lname'].value,
        "email": this.loginSignupForm.controls['email'].value || 'string',
        "contactNo": this.loginSignupForm.controls['phoneNumber'].value || 'string',
        "gender": this.loginSignupForm.controls['gender'].value,
        "primaryUser": true,
        "companyName": "",
        "companyID": 0,
        "companyAddress": "",
        "shopAddress": "",
        "organisation": "",
        "city": "",
        "state": "",
        "comments": "",
        "gst": "",
        "createdBy": Number(JSON.parse(localStorage.getItem('user') ?? '{}')?.UserId ?? null)
      }

      this.httpSer.httpPost(API_URLS.SIGNUP, param).subscribe((res: any) => {
        if (res.type == "S") {
          this.formValidation.showAlert('Signup Successful! You can now log in with your new account.', 'success');
          this.toggleSignUpLogin('Log in');
        } else {
          this.formValidation.showAlert('Error!!', 'danger');
        }
      })
    }
  }

  emailFunc() {
    this.isPhone = false;
    this.isEmail = true;
    this.getOTP = false;
    this.loginSignupForm.patchValue({
      phoneNumber: null,
      // otp: null
    })
  }

  phoneFunc() {
    this.isPhone = true;
    this.isEmail = false;
    this.loginSignupForm.patchValue({
      email: '',
      password: ''
    })
  }

  getOTPFunc() {
    this.loginSignupForm.controls['phoneNumber']?.valid ? this.getOTP = true : this.getOTP = false;
  }

  isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }
  // phoneNoInput() {
  //   !this.loginSignupForm.get('phoneNumber')?.valid ? this.getOTP = true : this.getOTP = false;
  // }

}
