import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent {
  profileForm!: FormGroup;
  isFormVisible: boolean = false;
  isFollowersVisible: boolean = false;
  isProfileFormVisible: boolean = false;
  user: any;
  userDetails: any;
  
  ngOnInit() { 
    this.getUserProfile()
  }

  constructor(
    private formBuilder: FormBuilder,
    private register: RegisterService
  ) {
    this.profileForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      profileUrl: ['', Validators.required],
      profileCaption:['', Validators.required],
    });
  }

  viewFollowers() {
    this.isFollowersVisible = true;
  }
  viewFollowing() {
    this.isFormVisible = true;
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
      this.userDetails= this.user.user
      console.log(this.userDetails);
    });
  }
}
