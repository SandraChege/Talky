import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UploadService } from '../services/cloudinary/upload.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  addPostForm!: FormGroup;
  files: any[] = [];
  user_id: string = '';
  storedUser: string | null = localStorage.getItem('user_details');

  constructor(private upload: UploadService) {
    this.addPostForm = new FormGroup({
      image: new FormControl([]),
      content: new FormControl('', Validators.required),
    });

    if (this.storedUser) {
      const user = JSON.parse(this.storedUser);
      this.user_id = user.user_id;
    } else {
      console.error('User details not found in local storage');
    }
  }

  onSelectPostImage(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemovePostImage(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  isFormVisible: boolean = false;
  showReply: boolean = false;

  viewForm() {
    // this.addPost = true;
    this.isFormVisible = true;
  }
  hideform() {
    this.isFormVisible = false;
  }

  // newPost() {}
  toggleReply() {
    this.showReply = true;
  }

  // onFileChanged(event: any) {
  //   this.files = event.target.files;
  // }

  newPost() {
    // Your logic to share the post
    console.log(this.addPostForm.value);
    this.addPostForm.value.image  = this.files

    if (this.addPostForm.valid) {
      const imageUrls: string[] = [];

      // Upload all images
      for (let index = 0; index < this.files.length; index++) {
        const data = new FormData();
        const file_data = this.files[index];
        data.append('file', file_data);
        data.append('upload_preset', 'x1zwskyt');
        data.append('cloud_name', 'dg5qb7ntu');

        console.log("data is ",data);
        
        this.upload.uploadImage(data).subscribe((res) => {
          // console.log(res.secure_url);
          imageUrls.push(res.secure_url);

          console.log("my image urls is ",imageUrls);
        });
      }
    }
    else{

      console.log("dat is not valid");
      
    }
  }
}
