import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent {
  resetForm!: FormGroup;
  showSuccessMessage = false;
  showErrorMessage = false;
  
  constructor(private formBuilder: FormBuilder, private register: RegisterService, private router: Router) {
    this.resetForm = this.formBuilder.group({
      email: ['', (Validators.required, Validators.email)]
    });
  }

  resetPassword() {
    if (this.resetForm.valid) {
      console.log(this.resetForm.value);
      this.register.forgotPassword(this.resetForm.value).then((data) => {
        console.log(data);
        this.showSuccessMessage = true;

        setTimeout(() => {
          this.showSuccessMessage = false;
          this.router.navigate(['forgot']);
        }, 3000);
      }).catch((error) => { 
        console.log(error);
        this.showErrorMessage = true;

        setTimeout(() => {
          this.showErrorMessage = false;
        }, 3000);
      })
    }
  }
}
