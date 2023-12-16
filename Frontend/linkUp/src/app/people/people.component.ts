import { Component } from '@angular/core';
import { RegisterService } from '../services/register.service';
import { UserDetails, getAllUsers } from '../interface/user';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent {

  constructor(private register: RegisterService) {}

  users: UserDetails[] = [];
  allusers: getAllUsers[] = []
  searchText = '';

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.register.fetchAllUsers()?.subscribe((response: any) => {
      this.allusers = response.users;
      console.log(this.allusers);
    })
  }

}
