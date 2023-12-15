import { Injectable } from '@angular/core';
import { UserDetails, loginUserDetails } from '../interface/user';
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

    // console.log(data);
    return data;
  }
  
  //GET USER DETAILS
  getuser() {
    const email = localStorage.getItem('email');
    if (!email) {
      return throwError('User not found');
    }
    return this.http.post(`http://localhost:4500/user/getoneuser`, { email });
  }

  //FORGOT PASSWORD
  forgot(email: string) {
    let res = await fetch('http://localhost:4500/user/forgotpassword', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({email})
    });

    let data = await res.json();
    
    return data
  }
}
