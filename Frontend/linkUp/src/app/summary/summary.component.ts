import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder) {
    this.profileForm = this.formBuilder.group({
      userFullName: ['', Validators.required],
      userName: ['', Validators.required],
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
}
