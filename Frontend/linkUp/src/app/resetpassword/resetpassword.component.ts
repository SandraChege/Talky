import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent {
  resetForm!: FormGroup;
  
  constructor(private formBuilder: FormBuilder) {
    this.resetForm = this.formBuilder.group({
      // email: ['', Validators.required, Validators.email],
      password: ['', Validators.required, Validators.minLength(8)]
    });
  }

  resetPassword() {
  }
}
