import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UploadService } from '../services/cloudinary/upload.service';
import { PostService } from '../services/post.service';
import { RegisterService } from '../services/register.service';
import { ActivatedRoute, Router } from '@angular/router';
import { singlePost } from '../interface/post';
import { fetchAllComments } from '../interface/comment';

@Component({
  selector: 'app-myposts',
  templateUrl: './myposts.component.html',
  styleUrls: ['./myposts.component.css'],
})
export class MypostsComponent {
  showReply: boolean = false;
  iseditCommentVisible: boolean = false;
  post: singlePost[] = [];
  newcommentText: string = '';
  newReplyText: string = '';
  fetchedComments: fetchAllComments[] = [];
  editedCommentText: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private register: RegisterService,
    private upload: UploadService,
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe((params) => {
      const postID = params['postID'] as string;

      if (postID) {
        this.viewSinglePost(postID);
        this.fetchAllCommentsByPostId(postID);
      }
    });
  }

  toggleLike(postID: string) {}

  //CREATE A COMMENT
  onSubmitComment(postID: string) {
    console.log(postID);
    console.log(this.newcommentText);
    this.postService
      .createComment(postID, this.newcommentText)
      ?.subscribe((response) => {
        console.log(response);
        this.viewSinglePost(postID);
        this.fetchAllCommentsByPostId(postID);
        this.newcommentText = '';
      });
  }

  //VIEW SINGLE POST
  viewSinglePost(postID: string) {
    console.log(postID);
    this.postService.fetchPostByID(postID)?.subscribe((response) => {
      this.post = response;
      console.log(this.post);
    });
  }

  //EDIT SINGLE POST
  editPost(userID: string, postID: string) {}

  //DELETE POST
  deletePost(postID: string, userID: string) {
    const currentuserID = localStorage.getItem('userID');
    if (currentuserID === userID) {
      this.postService.deletePost(postID)?.subscribe((response) => {
        console.log(response);
        this.router.navigate(['profile'])
      });
    }
  }

  //FETCH ALL COMMENTS
  fetchAllCommentsByPostId(postID: string) {
    this.postService.getCommentsByPostId(postID)?.subscribe((response: any) => {
      this.fetchedComments = response;
      console.log(this.fetchedComments);
    });
  }

  //REPLY TO A COMMENT
  toggleReply( commentID: string, postID: string, userID: string, parentCommentID: string) {
    this.iseditCommentVisible = false;
    this.showReply = true;
    console.log(this.newReplyText);
    this.postService.replyComment(commentID, postID, this.newReplyText)?.subscribe((response) => {
      console.log(response);
      this.newReplyText = ''
      this.showReply = false
      this.fetchAllCommentsByPostId(postID)
    })
    
  }

  //EDIT COMMENTS
  editComment(commentID: string, postID: string, userID: string) {
    this.showReply = false;
    const currentuserID = localStorage.getItem('userID');
  }

  //DELETE COMMENT
  deleteComment(commentID: string, postID: string, userID: string) {
    this.iseditCommentVisible = false;
    this.showReply = false;
    const currentuserID = localStorage.getItem('userID');
    if (currentuserID === userID) {
      this.postService.deleteComment(commentID)?.subscribe((response) => {
        console.log(response);
        this.fetchAllCommentsByPostId(postID);
      });
    }
  }
}
