export interface getAllPosts {
  imageUrl: string;
  postContent: string;
  created_at: Date;
  userID: string;
  postID: string;
}
export interface postBody {
  imageUrl: string;
  postContent: string;
  userID: string;
}

export interface editPost {
  created_at: Date;
  imageUrl:string;
  isDeleted: false;
  postContent: string;
  postID: string;
  userID: string;
}