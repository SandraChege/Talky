import { Component } from '@angular/core';
import { followers} from '../interface/followers';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css'],
})
export class FollowersComponent {
  searchText = '';

  constructor(private register: RegisterService) {}
  ngOnInit() {
    this.getAllFollowers();
  }

  followers: followers[] = [];
  user!: any;
  Followersnumber = 0

  getAllFollowers() {
    this.register.getFollowers()?.subscribe((response) => {
      this.followers = response;
      console.log(this.followers);
      this.Followersnumber = this.followers.length      
    });
  }
}
