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
  viewposts = true;

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
      profileUrl: ['', Validators.required],
      profileCaption: ['', Validators.required],
    });
  }
  viewmyposts() {
    this.isFormVisible = false;
    this.isFollowersVisible = false;
    this.viewposts = true;
  }
  viewFollowers() {
    this.isFollowersVisible = true;
    this.isFormVisible = false;
    this.viewposts = false;
  }
  viewFollowing() {
    this.isFormVisible = true;
    this.isFollowersVisible = false;
    this.viewposts = false;
  }
  updateProfile() {
    this.isProfileFormVisible = true;
    this.register.getuser().subscribe((response) => {
      this.user = response;
      this.userDetails = this.user.user;
      console.log(this.userDetails);

      this.profileForm.patchValue({
        fullname: this.userDetails.fullname,
        profileUrl: this.userDetails.profileUrl,
        profileCaption: this.userDetails.profileCaption,
      });
    });
  }
  hideform() {
    this.isFormVisible = false;
    this.isFollowersVisible = false;
    this.isProfileFormVisible = false;
  }

  getUserProfile() {
    this.register.getuser().subscribe((response) => {
      this.user = response;
      this.userDetails = this.user.user;
      console.log(this.userDetails);
    });
  }
}

