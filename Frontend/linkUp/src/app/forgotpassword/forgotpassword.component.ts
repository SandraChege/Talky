import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css'],
})
export class ForgotpasswordComponent {
  resetForm!: FormGroup;
  showSuccessMessage: boolean = false;
  showErrorMessage: boolean = false;

  constructor(private formBuilder: FormBuilder, private register:RegisterService, private router: Router) {
    this.resetForm = this.formBuilder.group({
      email: ['', (Validators.required, Validators.email)],
      resetToken: ['', Validators.required], 
      newPassword: ['', (Validators.required, Validators.minLength(8))],
    });
  }

  resetPassword() {
    if (this.resetForm.valid) {
      console.log(this.resetForm.value);
      this.register
        .resetPassword(this.resetForm.value)
        .then((data) => {
          console.log(data);
          this.showSuccessMessage = true;

          setTimeout(() => {
            this.showSuccessMessage = false;
            this.router.navigate(['login']);
          }, 3000);
            
        })
        .catch((error) => {
          console.log(error);
          this.showErrorMessage = true;

          setTimeout(() => {
            this.showErrorMessage = false;
          }, 3000);
        });
    }
  }
}
