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
  
  ngOnInit() { 
    this.getUserProfile()
  }

  constructor(
    private formBuilder: FormBuilder,
    private register: RegisterService
  ) {
    this.profileForm = this.formBuilder.group({
      userFullName: ['', Validators.required],
      profileUrl: ['', Validators.required],
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
  }
  hideform() {
    this.isFormVisible = false;
    this.isFollowersVisible = false;
    this.isProfileFormVisible = false;
  }

  getUserProfile() {
    this.register.getuser().subscribe((response) => {
      this.user = response;
      console.log(this.user.user);

      // this.ProfileForm.patchValue({
      //   userName: this.user.user.userName,
      //   email: this.user.user.email,
      //   phone_no: this.user.user.phone_no,
      // });
    });
  }
}
