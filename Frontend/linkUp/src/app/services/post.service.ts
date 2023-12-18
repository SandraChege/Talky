import { Injectable } from '@angular/core';
import { allposts, editPost, getAllPosts, postBody, singlePost } from '../interface/post';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}
  //FETCH ALL POSTS
  fetchAllPosts() {
    const token = localStorage.getItem('token');
    //console.log(token);

    if (token) {
      let response = this.http.get('http://localhost:4500/post/all', {
        headers: new HttpHeaders({
          'Content-type': 'application/json',
          token: token,
        }),
      });
      return response;
    } else {
      return null;
    }
  }

  //GET POSTS BY ID
  fetchPostByID(postID: string) {
    const token = localStorage.getItem('token');

    if (token) {
      return this.http.get<singlePost[]>(`http://localhost:4500/post/single/${postID}`, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          token: token,
        }),
      });
    } else {
      return null;
    }
  }

  //GET POSTS BY USERID
  fetchPostByUserID() {
    const token = localStorage.getItem('token');
    const userID = localStorage.getItem('userID');

    if (token) {
      return this.http.get<allposts[]>(
        `http://localhost:4500/post/byUserID/${userID}`,
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

  //CREATE POSTS
  createNewPost(post: postBody) {
    const token = localStorage.getItem('token');
    const userID = localStorage.getItem('userID');

    if (token) {
      return this.http.post(
        'http://localhost:4500/post/create',
        {
          imageUrl: post.imageUrl,
          postContent: post.postContent,
          userID: userID,
        },
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

  //EDIT or UPDATE POSTS
  editPost(post: editPost) {
    const token = localStorage.getItem('token');
    const userID = localStorage.getItem('userID');

    if (token) {
      return this.http.put(
        'http://localhost:4500/post/update',
        { post, userID },
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

  //DELETE POSTS
  deletePost(postID: string) {
    const token = localStorage.getItem('token');

    if (token) {
      return this.http.delete(`http://localhost:4500/post/delete/${postID}`, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          token: token,
        }),
      });
    } else {
      return null;
    }
  }

  //CREATE COMMENTS
  createComment(postID: string, comment: string) {
    const token = localStorage.getItem('token');
    const userID = localStorage.getItem('userID');

    if (token) {
      const commentBody = {
        postID: postID,
        userID: userID,
        comment: comment,
      };

      return this.http.post(
        'http://localhost:4500/post/createcomment',
        commentBody,
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

  //GET ALL COMMENTS
  //GET COMMENTS BY POSTID
  getCommentsByPostId(postID: string) {
    const token = localStorage.getItem('token');

    if (token) {
      return this.http.get(`http://localhost:4500/post/getcomments/${postID}`, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          token: token,
        }),
      });
    } else {
      return null;
    }
  }

  //DELETE COMMENTS
  deleteComment(commentID: string) {
    const token = localStorage.getItem('token');

    if (token) {
      return this.http.delete(
        `http://localhost:4500/post/deletecomment/${commentID}`,
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

  //UPDATE OR EDIT COMMENTS
  editComment(
    commentID: string,
    postID: string,
    userID: string,
    comment: string
  ) {
    const token = localStorage.getItem('token');

    if (token) {
      const commentbody = {
        postID: postID,
        userID: userID,
        comment: comment,
        commentID: commentID,
      };
      // console.log(commentbody);

      return this.http.put(
        'http://localhost:4500/post/updatecomment',
        commentbody,
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

  //TOGGLE BETWEEN LIKE AND UNLIKE
  toggleLike(postID: string) {
    const token = localStorage.getItem('token');
    const userID = localStorage.getItem('userID');

    if (token && userID) {
      return this.http.post(
        'http://localhost:4500/post/likepost',
        { userID: userID, postID: postID },
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

  //GET NUMBER OF LIKES
  getLikesCount(postID: string) {
    const token = localStorage.getItem('token');

    if (token) {
      return this.http.get(`http://localhost:4500/post/getlikes/${postID}`, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          token: token,
        }),
      });
    } else {
      return null;
    }
  }
}
