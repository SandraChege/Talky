import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { UploadService } from '../services/cloudinary/upload.service';
import { PostService } from '../services/post.service';
import { allposts } from '../interface/post';

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
  allposts: allposts[] = [];

  // followers: followers[] = [];

  ngOnInit() {
    this.getUserProfile();
    this.getPostsByUserID();
  }

  constructor(
    private formBuilder: FormBuilder,
    private register: RegisterService,
    private upload: UploadService,
    private post: PostService
  ) {
    this.profileForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      profileUrl: [],
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
    // this.getPostsByUserID()
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

  // updateProfile() {
  //   this.isProfileFormVisible = true;
  //   this.register.getuser().subscribe((response) => {
  //     this.user = response;
  //     this.userDetails = this.user.user;
  //     // console.log(this.userDetails);

  //     this.profileForm.patchValue({
  //       fullname: this.userDetails.fullname,
  //       profileUrl: this.userDetails.profileUrl,
  //       profileCaption: this.userDetails.profileCaption,
  //     });
  //   });
  // }

  hideform() {
    this.isFormVisible = false;
    this.isFollowersVisible = false;
    this.isProfileFormVisible = false;
  }
  //FETCH USER PROFILE
  getUserProfile() {
    this.register.getuser().subscribe((response) => {
      console.log(response);

      this.user = response;
      this.userDetails = this.user.user;
      // console.log(this.userDetails);
    });
  }

  //UPDATE USER PROFILE
  updateProfile() {
    this.isProfileFormVisible = true;
    this.register.getuser().subscribe((response) => {
      this.user = response;
      this.userDetails = this.user.user;
      // console.log(this.userDetails);
      this.profileForm.patchValue({
        fullName: this.userDetails.fullname,
        profileCaption: this.userDetails.profileCaption,
        profileUrl: this.userDetails.profileUrl,
      });
    });
    // console.log(this.profileForm.value);

    this.profileForm.value.profileUrl = this.files;
    if (this.profileForm.valid) {
      const imageUrls: string[] = [];

      // Upload all images
      for (let index = 0; index < this.files.length; index++) {
        const data = new FormData();
        const file_data = this.files[index];
        data.append('file', file_data);
        data.append('upload_preset', 'x1zwskyt');
        data.append('cloud_name', 'dg5qb7ntu');

        console.log('data is ', data);
        this.upload.uploadImage(data).subscribe((res) => {
          imageUrls.push(res.secure_url);

          // Check if all images are uploaded before making the post request
          if (imageUrls.length === this.files.length) {
            const profileDetails = {
              imageUrl: imageUrls.join(','),
              fullname: this.profileForm.value.fullname,
              profileCaption: this.profileForm.value.profileCaption,
            };
            this.register
              .updateProfile(profileDetails)
              ?.subscribe((response) => {
                console.log(response);
              });
          }
        });
      }
    } else {
      console.log('data is not valid');
    }
  }

  //GET POSTS BY ID
  getPostsByUserID() {
    this.post.fetchPostByUserID()?.subscribe((response) => {
      this.allposts = response;
      console.log(this.allposts);
    });
  }
}
