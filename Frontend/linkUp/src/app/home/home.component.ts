import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UploadService } from '../services/cloudinary/upload.service';
import { RegisterService } from '../services/register.service';
import { getAllUsers } from '../interface/user';
import { getAllPosts } from '../interface/post';
import { PostService } from '../services/post.service';

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

  ngOnInit() {
    this.getAllUsers();
    this.fetchAllPosts();
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

  isFormVisible: boolean = false;
  showReply: boolean = false;

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
    })
  }

  //FETCHALLCOMMENTS BY POSTID
  fetchAllCommentsByPostId(postID: string) { 
    // console.log(postID);
    this.postService.getCommentsByPostId(postID)?.subscribe((response: any) => {
      console.log(response);
      const postIndex = this.allPosts.findIndex((post) => post.postID === postID);
      if (postIndex !== -1) {
        this.allPosts[postIndex].comments = response.map((comment:any)=> ({
          ...comment,
        fullname: this.fetchUsernameById(comment.userID),
        }))
      }
    })
  }
  //FETCH USERNAME BY THEIR ID
  fetchUsernameById(userID: string) {
    const userIndex = this.allusers.findIndex(user => user.userID === userID);
    if(userIndex !== -1) {
      return this.allusers[userIndex].fullname;
    } else {
      return 'Name not found';
    }
  }

  //FETCH SUGGESTIONS/USERS
  getAllUsers() {
    this.register.fetchAllUsers()?.subscribe((response: any) => {
      this.allusers = response.users;
    });
  }
}
