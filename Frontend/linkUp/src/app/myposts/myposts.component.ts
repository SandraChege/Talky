import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UploadService } from '../services/cloudinary/upload.service';
import { PostService } from '../services/post.service';
import { RegisterService } from '../services/register.service';
import { ActivatedRoute } from '@angular/router';
import { singlePost } from '../interface/post';

@Component({
  selector: 'app-myposts',
  templateUrl: './myposts.component.html',
  styleUrls: ['./myposts.component.css'],
})
export class MypostsComponent {
  showReply: boolean = false;
  post: singlePost[] = [];
  // showReply: boolean = false;
  // iseditCommentVisible: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private register: RegisterService,
    private upload: UploadService,
    private postService: PostService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      const postID = params['postID'] as string;

      if (postID) {
        this.viewSinglePost(postID);
      }
    });
  }

  toggleReply() {
    this.showReply = true;
  }
  toggleLike(postID: string) {}
  onSubmitComment(postID: string) {}

  //VIEW SINGLE POST
  viewSinglePost(postID: string) {
    this.postService.fetchPostByID(postID)?.subscribe((response) => {
      this.post = response;
      console.log(this.post);
    });
  }

  //EDIT SINGLE POST
  editPost(userID: string, postID: string) {}

  //DELETE POST
  deletePost(postID: string, userID: string) {}
}
