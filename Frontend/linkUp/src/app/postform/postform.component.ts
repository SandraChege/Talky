import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-postform',
  templateUrl: './postform.component.html',
  styleUrls: ['./postform.component.css']
})
export class PostformComponent {
  addPostForm!: FormGroup;

  constructor() {
    this.addPostForm = new FormGroup({
      image: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required)
    });
  }

  newPost() {
    
  }
}
