import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  addPostForm!: FormGroup;

  constructor() {
    this.addPostForm = new FormGroup({
      image: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required),
    });
  }

  isFormVisible: boolean = false;

  viewForm() {
    // this.addPost = true;
    this.isFormVisible = true;
  }
  hideform() {
    this.isFormVisible = false;
  }

  newPost() {}
}
