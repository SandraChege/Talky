import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  profileForm!: FormGroup;
  isFormVisible: boolean = false;
  isFollowersVisible: boolean = false;
  isProfileFormVisible: boolean = false;
  isFavourite1: boolean = true;
  isFavourite2: boolean = false;
  isFavourite3: boolean = false;
  viewposts = true;
  files: any[] = [];

  user: any;
  userDetails: any;

  ngOnInit() {
    this.getUserProfile();
  }

  constructor(
    private formBuilder: FormBuilder,
    private register: RegisterService
  ) {
    this.profileForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      profileUrl: ([ ]),
      profileCaption: ['', Validators.required],
    });
  }
  viewmyposts() {
    this.isFormVisible = false;
    this.isFollowersVisible = false;
    this.viewposts = true;
    this.isFavourite1 = true;
    this.isFavourite2 = false;
    this.isFavourite3 = false;
  }
  viewFollowers() {
    this.isFollowersVisible = true;
    this.isFormVisible = false;
    this.viewposts = false;
    this.isFavourite2 = true;
    this.isFavourite1 = false;
    this.isFavourite3 = false;
  }
  viewFollowing() {
    this.isFormVisible = true;
    this.isFollowersVisible = false;
    this.viewposts = false;
    this.isFavourite3 = true;
    this.isFavourite1 = false;
    this.isFavourite2 = false;
  }
  onSelectPostImage(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemovePostImage(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  updateProfile() {
    this.isProfileFormVisible = true;
    this.register.getuser().subscribe((response) => {
      this.user = response;
      this.userDetails = this.user.user;
      // console.log(this.userDetails);

      this.profileForm.patchValue({
        fullname: this.userDetails.fullname,
        profileUrl: this.userDetails.profileUrl,
        profileCaption: this.userDetails.profileCaption,
      });
    });
  }
  // newPost() {
  //   // Your logic to share the post
  //   console.log(this.addPostForm.value);
  //   this.addPostForm.value.image = this.files;

  //   if (this.addPostForm.valid) {
  //     const imageUrls: string[] = [];

  //     // Upload all images
  //     for (let index = 0; index < this.files.length; index++) {
  //       const data = new FormData();
  //       const file_data = this.files[index];
  //       data.append('file', file_data);
  //       data.append('upload_preset', 'x1zwskyt');
  //       data.append('cloud_name', 'dg5qb7ntu');

  //       console.log('data is ', data);

  //       this.upload.uploadImage(data).subscribe((res) => {
  //         // console.log(res.secure_url);
  //         imageUrls.push(res.secure_url);

  //         console.log('my image urls is ', imageUrls);
  //       });
  //     }
  //   } else {
  //     console.log('dat is not valid');
  //   }
  // }
  hideform() {
    this.isFormVisible = false;
    this.isFollowersVisible = false;
    this.isProfileFormVisible = false;
  }

  getUserProfile() {
    this.register.getuser().subscribe((response) => {
      this.user = response;
      this.userDetails = this.user.user;
      // console.log(this.userDetails);
    });
  }

  //GET ALL POSTS BY USERID
  
}

