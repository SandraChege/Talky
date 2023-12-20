import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { UploadService } from '../services/cloudinary/upload.service';
import { PostService } from '../services/post.service';
import { allposts } from '../interface/post';
import { gte } from 'cypress/types/lodash';

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
  imageurl = '';
  numPosts = 0;

  user: any;
  userDetails: any;
  allposts: allposts[] = [];

  // followers: followers[] = [];

  ngOnInit() {
    this.getUserProfile();
    this.getPostsByUserID();
    this.populateForm();
  }

  constructor(
    private formBuilder: FormBuilder,
    private register: RegisterService,
    private upload: UploadService,
    private post: PostService
  ) {
    this.profileForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      profileUrl: [''],
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

    if (this.files) {
      const data = new FormData();
      const file_data = this.files;

      data.append('file', file_data[0]);
      data.append('upload_preset', 'x1zwskyt');
      data.append('cloud_name', 'dg5qb7ntu');

      this.upload.uploadImage(data).subscribe((res) => {
        console.log(res.secure_url);
        this.imageurl = res.secure_url
      });
    }
  }

  onRemovePostImage(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  hideform() {
    this.isFormVisible = false;
    this.isFollowersVisible = false;
    this.isProfileFormVisible = false;
  }

  //FETCH USER PROFILE
  getUserProfile() {
    this.register.getuser().subscribe((response) => {
      // console.log(response);

      this.user = response;
      this.userDetails = this.user.user;
      // console.log(this.userDetails);
    });
  }

  //UPDATE USER PROFILE

  populateForm() {
    this.register.getuser().subscribe((response) => {
      this.user = response;
      this.userDetails = this.user.user;
      // console.log(this.userDetails);

      this.profileForm.patchValue({
        fullName: this.userDetails.fullname,
        profileCaption: this.userDetails.profileCaption,
        profileUrl: this.userDetails.profileUrl,
      });
          
      this.imageurl = this.userDetails.profileUrl
    });
  }

  updateProfile() {
    this.isProfileFormVisible = true;
    
    console.log(this.imageurl);
    // this.profileForm.value.profileUrl = this.files;

    if (this.profileForm.value.fullName ) {
      const profileDetails = {
        profileUrl: this.imageurl, // Assuming you want to concatenate image URLs
        profileCaption: this.profileForm.value.profileCaption,
        fullname: this.profileForm.value.fullName,
        userID: localStorage.getItem('userID'),
      };

      console.log(profileDetails);

      this.register.updateProfile(profileDetails)?.subscribe((response) => {
        console.log('Profile updated successfully', response);
        this.isProfileFormVisible = false;
        this.populateForm()
      });
    
  } else {
      console.log('data is not valid');
    }
  }

  //GET POSTS BY ID
  getPostsByUserID() {
    this.post.fetchPostByUserID()?.subscribe((response) => {
      this.allposts = response;
      console.log(this.allposts);
      this.numPosts = this.allposts.length
    });
  }
}
