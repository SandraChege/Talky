import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registrationForm!: FormGroup;
  showSuccessMessage = false;
  showErrorMessage = false;

  constructor(
    private formBuilder: FormBuilder,
    private register: RegisterService,
    private router: Router
  ) {
    this.registrationForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      fullname: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  registerNewUser() {
    if (this.registrationForm.valid) {
      // console.log(this.registrationForm);
      this.register.registerNewUser(this.registrationForm.value).then(() => {
        //Show success message
        this.showSuccessMessage = true;
        setTimeout(() => {
          this.showSuccessMessage = false;
          this.router.navigate(['login']);
        }, 3000);
      });
    }
  }
}
