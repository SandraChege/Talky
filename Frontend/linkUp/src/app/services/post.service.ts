import { Injectable } from '@angular/core';
import { getAllPosts } from '../interface/post';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  fetchAllPosts() {
    const token = localStorage.getItem('token');
    //console.log(token);

    if (token) {
      let response = this.http.get<{ posts: getAllPosts[] }>(
        'http://localhost:4500/post/all',
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
}
