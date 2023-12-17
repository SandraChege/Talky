import { Injectable } from '@angular/core';
import { UserDetails, getAllUsers, loginUserDetails, resetPasswordDetails, toggleFollowUserInterface } from '../interface/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  //REGISTER USER
  async registerNewUser(userdetail: UserDetails) {
    let response = await fetch('http://localhost:4500/user/register', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(userdetail),
    });

    const data = await response.json();

    // console.log(data);

    return data;
  }

  //LOGIN USER
  async loginregistereduser(logindata: loginUserDetails) {
    // let body = {email, password}
    let res = await fetch('http://localhost:4500/user/login', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(logindata),
    });

    let data = await res.json();

    // console.log(data);
    return data;
  }

  //CHECK USER DEATAILS
  async checkuserdetails() {
    let token = localStorage.getItem('token');

    let res = await fetch('http://localhost:4500/user/checkuserdetails', {
      headers: {
        'Content-Type': 'application/json',
        token: `${token}`,
      },
      method: 'GET',
    });

    let data = await res.json();
    return data;
  }

  //GET USER DETAILS
  getuser() {
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');
    if (!email) {
      return throwError('User not found');
    }
    return this.http.post(`http://localhost:4500/user/getoneuser`, { email });
  }

  //FORGOT PASSWORD
  async forgotPassword(email: string) {
    let res = await fetch('http://localhost:4500/user/forgot', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(email),
    });

    let data = await res.json();

    return data;
  }

  //RESET PASSWORD
  async resetPassword(resetdetails: resetPasswordDetails) {
    let res = await fetch('http://localhost:4500/user/resetpassword', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(resetdetails),
    });

    let data = await res.json();

    return data;
  }

  //GET ALL USERS
  fetchAllUsers() {
    const token = localStorage.getItem('token');
    //console.log(token);

    if (token) {
      let response = this.http.get<{ users: getAllUsers[] }>(
        'http://localhost:4500/user/getallusers',
        {
          headers: new HttpHeaders({
            'Content-type': 'application/json',
            token: token,
          }),
        }
      );
      return response;
    } else {
      return null;
    }
  }

  //GET USER BY USERID
  getUserByID(userID: string) {
    const token = localStorage.getItem('token');

    if (token) {
      return this.http.get<UserDetails>(
        `http://localhost:4500/user/getoneuser/${userID}`,
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            token: token,
          }),
        }
      );
    } else {
      return null;
    }
  }

  //FOLLOW AND UNFOLLOW USER
  toggleFollowUser(usersDetails: toggleFollowUserInterface) {
    return this.http.post(
      'http://localhost:4500/user/toggleFollowUser',
      usersDetails
    );
  }

  //GET FOLLOWINGS
  getFollowings() {
    let token = localStorage.getItem('token') as string;
    let userID = localStorage.getItem('userID') as string;
    if (token) {
      return this.http.get(
        `http://localhost:4500/user/getFollowings/${userID}`,
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            token: token,
          }),
        }
      );
    } else {
      return null;
    }
    //   .pipe(map((response) => response.followers));
  }

  // GET FOLLOWERS
  getFollowers() {
    let token = localStorage.getItem('token') as string;
    let userID = localStorage.getItem('userID') as string
    if (token) {
      return this.http.get(
        `http://localhost:4500/user/getFollowers/${userID}`,
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            token: token,
          }),
        }
      )
    } else {
      return null;
    }
    //   .pipe(map((response) => response.followers));
  }

  //UPDATE PROFILE
  updateProfile(profile: any) {
    const token = localStorage.getItem('token');
    const userID = localStorage.getItem('userID');

    if (token) {
      return this.http.put(
        'http://localhost:4500/post/update',
        { profile, userID },
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            token: token,
          }),
        }
      );
    } else {
      return null;
    }
  }
}
