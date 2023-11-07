import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  hide = true;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private auth: AuthService
  ) {}

  registerForm = this.fb.group({
    userName: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^[a-z]+$/),
      ],
    ],
    fullName: ['', [Validators.required, Validators.pattern(/^[A-Za-z ]+$/)]],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
        ),
      ],
    ],
  });

  register() {
    if (
      this.registerForm.controls.userName.errors?.['required'] ||
      this.registerForm.controls.userName.errors?.['pattern'] ||
      this.registerForm.controls.userName.errors?.['minLength']
    ) {
      Swal.fire({
        icon: 'warning',
        title:
          'Please provide your username in lowercase letters only and not less than 8 characters.',
        timer: 1500,
        showConfirmButton: false,
      });
    } else if (
      this.registerForm.controls.fullName.errors?.['required'] ||
      this.registerForm.controls.fullName.errors?.['pattern']
    ) {
      Swal.fire({
        icon: 'warning',
        title: 'Please provide your full name in letters only.',
        timer: 1500,
        showConfirmButton: false,
      });
    } else if (
      this.registerForm.controls.password.errors?.['required'] ||
      this.registerForm.controls.password.errors?.['pattern']
    ) {
      Swal.fire({
        icon: 'warning',
        title:
          'Create a password that matches the following pattern : least 8 characters long (A-b- @).',
        timer: 1500,
        showConfirmButton: false,
      });
    } else {
      const data = this.registerForm.value;
      this.auth.saveNewData(data);
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        timer: 1500,
        showConfirmButton: false,
      });
      setTimeout(() => {
        this.router.navigate(['/profile']);
      }, 1550);
    }
  }
}
