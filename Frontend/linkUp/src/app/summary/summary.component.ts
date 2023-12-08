import { Component } from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent {
  isFormVisible: boolean = false;
  isFollowersVisible: boolean = false;

  viewFollowers() {
    this.isFollowersVisible = true;
  }
  viewFollowing() {
    this.isFormVisible = true;
  }
  hideform() {
    this.isFormVisible = false;
    this.isFollowersVisible= false;
  }

}
