import { Component } from '@angular/core';
import { RegisterService } from '../services/register.service';
import { following   } from '../interface/followers';
import { UserDetails } from '../interface/user';


@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css'],
})
export class FollowingComponent {
  searchText = '';

  constructor(private register: RegisterService) {}
  ngOnInit() {
    this.getAllFollowings();
  }

  following: following[] = [];
  user!: any;

  getAllFollowings() {
    this.register.getFollowings()?.subscribe((response) => {
      this.following = response;
      console.log(this.following);
      // this.following.forEach((follower) => {
      //   // console.log(follower);
      //   const followerID = follower.followed_userID;
      //   console.log(followerID);
      //   this.register.getUserByID(followerID)?.subscribe((response) => {
      //     // console.log(response);
      //     this.user = response
      //     console.log(this.user);
      //   });
      // });
    });
  }
}
