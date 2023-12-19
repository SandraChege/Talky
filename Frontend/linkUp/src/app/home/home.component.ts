import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { UploadService } from '../services/cloudinary/upload.service';
import { RegisterService } from '../services/register.service';
import { getAllUsers } from '../interface/user';
import { editPost, getAllPosts } from '../interface/post';
import { PostService } from '../services/post.service';
import { Comment } from '../interface/comment';
// import { postBody } from '../interface/post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  addPostForm!: FormGroup;
  replyForm!: FormGroup;
  editCommentForm!: FormGroup;
  files: any[] = [];
  allusers: getAllUsers[] = [];
  allPosts: any[] = [];
  updatedata: any;
  isFormVisible: boolean = false;
  isUpdateFormVisible: boolean = false;
  showReply: boolean = false;
  iseditCommentVisible: boolean = false;
  editedCommentText: string = '';
  currentComment: any;
  newcommentText: string = '';
  postLikeCount = 0;
  userID = localStorage.getItem('userID');
  storedUser: string | null = localStorage.getItem('user_details');
  newReplyText: string = '';
  postid = '';
  commentid = '';
  userid = '';
  parentcommentid = '';
  replycommentcontext = '';

  ngOnInit() {
    this.getAllUsers();
    this.fetchAllPosts();
  }

  constructor(
    private upload: UploadService,
    private register: RegisterService,
    private postService: PostService,
    private formBuilder: FormBuilder
  ) {
    this.addPostForm = new FormGroup({
      image: new FormControl([]),
      content: new FormControl('', Validators.required),
    });

    this.replyForm = this.formBuilder.group({
      reply: ['', Validators.required],
    });

    this.editCommentForm = this.formBuilder.group({
      reply: ['', Validators.required],
    });
  }

  onSelectPostImage(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemovePostImage(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  viewForm() {
    // this.addPost = true;
    this.isFormVisible = true;
  }
  hideform() {
    this.isFormVisible = false;
    this.isUpdateFormVisible = false;
  }

  //CREATE POST
  newPost() {
    // Your logic to share the post
    console.log(this.addPostForm.value);
    this.addPostForm.value.image = this.files;

    if (this.addPostForm.valid) {
      const imageUrls: string[] = [];

      if (this.files.length == 0 && !this.addPostForm.value.content) {
        console.log('Either an image or content is required.');
        return;
      }

      // Upload all images
      for (let index = 0; index < this.files.length; index++) {
        const data = new FormData();
        const file_data = this.files[index];
        data.append('file', file_data);
        data.append('upload_preset', 'x1zwskyt');
        data.append('cloud_name', 'dg5qb7ntu');

        console.log('data is ', data);

        // this.upload.uploadImage(data).subscribe((res) => {
        //   // console.log(res.secure_url);
        //   imageUrls.push(res.secure_url);

        //   console.log('my image urls is ', imageUrls);

        // });
        this.upload.uploadImage(data).subscribe((res) => {
          imageUrls.push(res.secure_url);

          // Check if all images are uploaded before making the post request
          if (imageUrls.length === this.files.length) {
            const postDetails = {
              imageUrl: imageUrls.join(','), // Assuming you want to concatenate image URLs
              postContent: this.addPostForm.value.content,
              userID: '', // You may need to get the user ID from your authentication service
            };

            this.postService
              .createNewPost(postDetails)
              ?.subscribe((response) => {
                console.log('Post created successfully', response);
                // Additional logic if needed
                this.isFormVisible = false;
                this.fetchAllPosts();
              });
          }
        });
      }
    } else {
      console.log('dat is not valid');
    }
  }

  //FETCH ALL POSTS
  fetchAllPosts() {
    this.postService.fetchAllPosts()?.subscribe((response: any) => {
      // console.log(response);
      this.allPosts = response.map((post: any) => ({
        ...post,
        creatorName: this.fetchUsernameById(post.userID),
      }));
      // console.log(this.allPosts);
      this.allPosts.forEach((post) => {
        this.fetchAllCommentsByPostId(post.postID);
      });
      this.allPosts.forEach((post) => {
        this.getLikesCount(post.postID);
        console.log(post.postID);
      });
    });
  }

  //EDIT POST
  editPost(userID: string, postID: string) {
    const currentuserID = localStorage.getItem('userID');

    if (currentuserID === userID) {
      this.isUpdateFormVisible = true;

      this.postService.fetchPostByID(postID)?.subscribe((response: any) => {
        console.log(response);
        this.addPostForm.patchValue({
          content: response,
          // files: [{ name: response.imageUrl, type: 'image' }],
        });
      });
    }
  }

  //DELETE POST
  deletePost(postID: string, userID: string) {
    console.log(userID);
    console.log(postID);
    const currentuserID = localStorage.getItem('userID');

    console.log(currentuserID);

    if (currentuserID === userID) {
      this.postService.deletePost(postID)?.subscribe((response) => {
        console.log(response);
        this.fetchAllPosts();
      });
    }
  }

  //FETCHALLCOMMENTS BY POSTID
  fetchAllCommentsByPostId(postID: string) {
    // console.log(postID);
    this.postService.getCommentsByPostId(postID)?.subscribe((response: any) => {
      // console.log(response);
      const postIndex = this.allPosts.findIndex(
        (post) => post.postID === postID
      );
      if (postIndex !== -1) {
        this.allPosts[postIndex].comments = response.map((comment: any) => ({
          ...comment,
          fullname: this.fetchUsernameById(comment.userID),
        }));
      }
    });
  }

  //FETCH USERNAME BY THEIR ID
  fetchUsernameById(userID: string) {
    const userIndex = this.allusers.findIndex((user) => user.userID === userID);
    if (userIndex !== -1) {
      return this.allusers[userIndex].fullname;
    } else {
      return 'Name not found';
    }
  }

  //CREATE COMMENT
  onSubmitComment(postID: string) {
    console.log(postID);
    console.log(this.newcommentText);
    this.postService
      .createComment(postID, this.newcommentText)
      ?.subscribe((response) => {
        console.log(response);
        this.fetchAllCommentsByPostId(postID);
        this.newcommentText = '';
      });
  }

  //DELETE COMMENT
  deleteComment(commentID: string, postID: string, userID: string) {
    console.log(commentID);
    console.log(postID);
    console.log(userID);
    const currentuserID = localStorage.getItem('userID');

    console.log(currentuserID);

    if (currentuserID === userID) {
      this.postService.deleteComment(commentID)?.subscribe((response) => {
        console.log(response);
        this.fetchAllCommentsByPostId(postID);
      });
    }
  }

  //TOGGLE BETWEEN LIKE AND UNLIKE A POST
  toggleLike(postID: string) {
    console.log(postID);

    this.postService.toggleLike(postID)?.subscribe((response) => {
      console.log(response);
      // this.fetchAllPosts();
    });
  }

  //GET LIKES COUNT
  getLikesCount(postID: string) {
    this.postService.getLikesCount(postID)?.subscribe((response) => {
      const result = response as { likeCount: number; message: string };
      this.postLikeCount = result.likeCount;
    });
  }

  //FETCH SUGGESTIONS/USERS
  getAllUsers() {
    this.register.fetchAllUsers()?.subscribe((response: any) => {
      this.allusers = response.users;
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
      this.iseditCommentVisible = false;
      this.fetchAllCommentsByPostId(this.postid);
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
      this.showReply = false;
      this.fetchAllCommentsByPostId(this.postid);
    });
  }
}
