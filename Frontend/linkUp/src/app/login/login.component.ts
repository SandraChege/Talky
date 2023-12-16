import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  showSuccessMessage = false;
  showErrorMessage = false;

  constructor(private formBuilder: FormBuilder, private register: RegisterService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  loginNewUser() {
    if (this.loginForm.valid) {
      this.register.loginregistereduser(this.loginForm.value).then((data) => {
        // console.log(data);
        localStorage.setItem('token', data.token);

        this.register.checkuserdetails().then((data) => {
          console.log(data);
          // console.log(data.info.role);
          localStorage.setItem('email', data.info.email);
          localStorage.setItem('username', data.info.username);
          localStorage.setItem('userID', data.info.userID);

          this.showSuccessMessage = true;

          setTimeout(() => {
            this.showSuccessMessage = false;
            if (data.info.role === 'user') {
              this.router.navigate(['home']);
            }
          }, 3000);
        }).catch((error) => { 
          console.log(error);
          this.showErrorMessage = true;
          setTimeout(() => {
            this.showErrorMessage = false;
          }, 3000);
        })
      })
    }
  }
}
