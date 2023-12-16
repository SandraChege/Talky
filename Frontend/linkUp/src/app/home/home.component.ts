import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UploadService } from '../services/cloudinary/upload.service';
import { RegisterService } from '../services/register.service';
import { getAllUsers } from '../interface/user';
import { getAllPosts } from '../interface/post';
import { PostService } from '../services/post.service';
import { Comment } from '../interface/comment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  addPostForm!: FormGroup;
  files: any[] = [];
  allusers: getAllUsers[] = [];
  allPosts: any[] = [];
  user_id: string = '';
  storedUser: string | null = localStorage.getItem('user_details');
  isFormVisible: boolean = false;
  showReply: boolean = false;
  iseditCommentVisible: boolean = false;
  editedCommentText: string = '';
  currentComment: any;
  newcommentText: string = '';

  ngOnInit() {
    this.getAllUsers();
    this.fetchAllPosts();
    // this.getLikesCount(postID);
  }

  constructor(
    private upload: UploadService,
    private register: RegisterService,
    private postService: PostService
  ) {
    this.addPostForm = new FormGroup({
      image: new FormControl([]),
      content: new FormControl('', Validators.required),
    });

    if (this.storedUser) {
      const user = JSON.parse(this.storedUser);
      this.user_id = user.user_id;
    } else {
      console.error('User details not found in local storage');
    }
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
  }

  // newPost() {}
  toggleReply() {
    this.showReply = true;
  }

  newPost() {
    // Your logic to share the post
    console.log(this.addPostForm.value);
    this.addPostForm.value.image = this.files;

    if (this.addPostForm.valid) {
      const imageUrls: string[] = [];

      // Upload all images
      for (let index = 0; index < this.files.length; index++) {
        const data = new FormData();
        const file_data = this.files[index];
        data.append('file', file_data);
        data.append('upload_preset', 'x1zwskyt');
        data.append('cloud_name', 'dg5qb7ntu');

        console.log('data is ', data);

        this.upload.uploadImage(data).subscribe((res) => {
          // console.log(res.secure_url);
          imageUrls.push(res.secure_url);

          console.log('my image urls is ', imageUrls);
        });
      }
    } else {
      console.log('dat is not valid');
    }
  }
  //FETCH ALL POSTS
  fetchAllPosts() {
    this.postService.fetchAllPosts()?.subscribe((response: any) => {
      this.allPosts = response.map((post: any) => ({
        ...post,
        creatorName: this.fetchUsernameById(post.userID),
      }));
      console.log(this.allPosts);
      this.allPosts.forEach((post) => {
        this.fetchAllCommentsByPostId(post.postID);
      });
    });
  }

  //FETCHALLCOMMENTS BY POSTID
  fetchAllCommentsByPostId(postID: string) {
    // console.log(postID);
    this.postService.getCommentsByPostId(postID)?.subscribe((response: any) => {
      console.log(response);
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
    this.postService.createComment(postID, this.newcommentText)?.subscribe((response) => { 
      console.log(response);
      this.fetchAllCommentsByPostId(postID);
      this.newcommentText = '';
    });
    
  }

  //EDIT COMMENT
  editComment(userID: string, postID: string, commentID: string) {
    // console.log(userID);
    // console.log(postID);
    // console.log(commentID);
    const currentUser = localStorage.getItem('userID');

    for (const post of this.allPosts) {
      const foundComment = post.comments.find(
        (comment: Comment) => comment.commentID === commentID
      );
      if (foundComment && foundComment.userID === currentUser) {
        // console.log(foundComment);

        this.currentComment = foundComment;
        this.iseditCommentVisible = true;
        this.editedCommentText = this.currentComment.comment;
        break;
      }
    }
  }
  saveEdit() {
    if (this.editedCommentText) {
      console.log(this.editedCommentText);

      this.postService
        .editComment(
          this.currentComment.userID,
          this.currentComment.postID,
          this.currentComment.commentID,
          this.editedCommentText
        )
        ?.subscribe((response) => {

          console.log(response);
          // Update comment text
          this.currentComment.comment = this.editedCommentText;
          // Reset editingComment and editedCommentText
          this.iseditCommentVisible = false;
          this.editedCommentText = '';
        });
    }
  }

  //DELETE COMMENT
  deleteComment(commentID: string, postID: string, userID: string) {
    console.log(commentID);
    console.log(postID);
    console.log(userID);
    const currentuserID = localStorage.getItem('userID');

    console.log(currentuserID);
    
    if(currentuserID === userID){
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
  getLikesCount(postID: string) { 
    this.postService.getLikesCount(postID)?.subscribe((response) => {
      console.log(response);
      // Update likes count
      const postIndex = this.allPosts.findIndex(post => post.postID === postID);
      if(postIndex !== -1) {
        this.allPosts[postIndex].likes = response;
      }
      console.log(typeof(postIndex));
      
    });
  }

  //FETCH SUGGESTIONS/USERS
  getAllUsers() {
    this.register.fetchAllUsers()?.subscribe((response: any) => {
      this.allusers = response.users;
    });
  }
}
