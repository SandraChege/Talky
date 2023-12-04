import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registrationForm!: FormGroup;
  showSuccessMessage = false;

  constructor(private formBuilder: FormBuilder) {
    this.registrationForm = this.formBuilder.group({
      email: ['', Validators.required, Validators.email],
      userFullName: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required, Validators.minLength(6)],
    });
  }

  registerNewUser() {}
}
