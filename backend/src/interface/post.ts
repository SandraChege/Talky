export interface Post {
  postContent:string;
  imageUrl: string;
  postID: string;
  userID: string;
}

export interface Comment {
  comment: string;
  commentID: string;
  postID: string;
  userID: string;
}