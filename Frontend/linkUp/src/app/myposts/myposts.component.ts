import { Component, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UploadService } from '../services/cloudinary/upload.service';
import { PostService } from '../services/post.service';
import { RegisterService } from '../services/register.service';
import { ActivatedRoute, Router } from '@angular/router';
import { singlePost } from '../interface/post';
import { fetchAllComments } from '../interface/comment';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { post } from 'cypress/types/jquery';

@Component({
  selector: 'app-myposts',
  templateUrl: './myposts.component.html',
  styleUrls: ['./myposts.component.css'],
})
export class MypostsComponent {
  replyForm!: FormGroup;
  editPostForm!: FormGroup;
  editCommentForm!: FormGroup;
  imageurl = '';
  postid = '';
  files: any[] = [];
  showReply: boolean = false;
  iseditCommentVisible: boolean = false;
  isUpdateFormVisible: boolean = false;
  post: singlePost[] = [];
  newcommentText: string = '';
  newReplyText: string = '';
  fetchedComments: fetchAllComments[] = [];
  editedCommentText: string = '';
  likecount = 0;
  commentid = '';
  userid = '';
  parentcommentid = '';
  replycommentcontext = '';

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

    this.replyForm = this.formBuilder.group({
      reply: ['', Validators.required],
    });

    this.editCommentForm = this.formBuilder.group({
      reply: ['', Validators.required],
    });

    this.editPostForm = this.formBuilder.group({
      image: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  hideform() {
    this.isUpdateFormVisible = false;
  }

  // LIKE AND UNLIKE POST
  toggleLike(postID: string) {
    console.log(postID);

    this.postService.toggleLike(postID)?.subscribe((response) => {
      console.log(response);
    });
  }

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

  onSelectPostImage(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);

    if (this.files) {
      const data = new FormData();
      const file_data = this.files;

      data.append('file', file_data[0]);
      data.append('upload_preset', 'x1zwskyt');
      data.append('cloud_name', 'dg5qb7ntu');

      this.upload.uploadImage(data).subscribe((res) => {
        console.log(res.secure_url);
        this.imageurl = res.secure_url;
      });
    }
  }

  onRemovePostImage(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  //EDIT SINGLE POST
  editPost(userID: string, postID: string) {
    this.isUpdateFormVisible = true;
    this.postid = postID;

    this.postService.fetchPostByID(postID)?.subscribe((response) => {
      this.post = response;
      console.log(this.post);

      this.editPostForm.patchValue({
        image: this.post[0].imageUrl,
        content: this.post[0].postContent,
      });

      this.imageurl = this.post[0].imageUrl;
      console.log(this.imageurl);
    });
  }
  updatePost() {
    if (this.editPostForm.value) {
      const postDetails = {
        imageUrl: this.imageurl, // Assuming you want to concatenate image URLs
        postContent: this.editPostForm.value.content,
        postID: this.postid,
        userID: localStorage.getItem('userID'),
      };

      console.log(postDetails);

      this.postService.editPost(postDetails)?.subscribe((response) => {
        console.log('updated post:', response);
        this.isUpdateFormVisible = false;
        this.viewSinglePost(this.postid);
      });
    } else {
      console.log('data is not valid');
    }
  }

  //DELETE POST
  deletePost(postID: string, userID: string) {
    const currentuserID = localStorage.getItem('userID');
    if (currentuserID === userID) {
      this.postService.deletePost(postID)?.subscribe((response) => {
        console.log(response);
        this.router.navigate(['profile']);
      });
    }
  }

  //FETCH ALL COMMENTS
  fetchAllCommentsByPostId(postID: string) {
    this.postService.getCommentsByPostId(postID)?.subscribe((response: any) => {
      this.fetchedComments = response;
      this.likecount = this.fetchedComments.length;
      console.log(this.fetchedComments);
    });
  }

  //REPLY TO A COMMENT
  toggleReply(
    commentID: string,
    postID: string,
    userID: string,
    parentCommentID: string
  ) {
    if (parentCommentID !== '') {
      console.log('clicked me');
      console.log(commentID);

      this.iseditCommentVisible = false;
      this.showReply = true;
      this.postid = postID;
      this.userid = userID;
      this.parentcommentid = commentID;
      console.log(this.parentcommentid);
    }
  }

  replycomment() {
    if (this.replyForm.valid) {
      const formValue = this.replyForm.value;
      this.replycommentcontext = formValue.reply;
    }
    const replyBody = {
      comment: this.replycommentcontext,
      userID: this.userid,
      postID: this.postid,
      parentCommentID: this.parentcommentid,
    };
    console.log(replyBody);

    this.postService.replyComment(replyBody)?.subscribe((response) => {
      console.log(response);
    });
  }

  //EDIT COMMENTS
  editComment(commentID: string, postID: string, userID: string) {
    this.showReply = false;

    const currentuserID = localStorage.getItem('userID');
    if (currentuserID === userID) {
      this.iseditCommentVisible = true;
      this.postid = postID;
      this.userid = userID;
      this.commentid = commentID;
    }
  }
  editcomments() {
    if (this.editCommentForm.valid) {
      const formValue = this.editCommentForm.value;
      this.replycommentcontext = formValue.reply;
    }
    const replyBody = {
      comment: this.replycommentcontext,
      userID: this.userid,
      postID: this.postid,
      commentID: this.commentid,
    };
    console.log(replyBody);

    this.postService.editusercomments(replyBody)?.subscribe((response) => {
      console.log(response);
      this.viewSinglePost(this.postid)
    });
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
