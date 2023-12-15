import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css'],
})
export class ForgotpasswordComponent {
  resetForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.resetForm = this.formBuilder.group({
      email: ['', (Validators.required, Validators.email)],
      token: ['', Validators.required], 
      password: ['', (Validators.required, Validators.minLength(8))],
    });
  }

  resetPassword() {}
}
