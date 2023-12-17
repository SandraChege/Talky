import { Component } from '@angular/core';
import { RegisterService } from '../services/register.service';
import { followingBody } from '../interface/followers';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css'],
})
export class FollowingComponent {
  constructor(private register: RegisterService) {}
  ngOnInit() {
    this.getAllFollowings();
  }

  getAllFollowings() {
    this.register.getFollowings()?.subscribe((response) => {
      console.log(response);
    });
  }
}
