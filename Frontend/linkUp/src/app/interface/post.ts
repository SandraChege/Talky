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

export interface allposts {
  created_at: Date;
  fullname: string;
  imageUrl: string;
  isDeleted: Boolean;
  postContent: string;
  postID: string;
  userID: string;
}

export interface singlePost {
  created_at: Date;
  fullname: string;
  imageUrl: string;
  isDeleted: boolean;
  postContent: string;
  postID: string;
  userID: string;
}

export interface fetchAllPosts {
  comments: object;
  created_at: string;
  fullname: string;
  imageUrl: string;
  isDeleted: boolean;
  postContent: string;
  postID: string;
  userID: string;
}