export interface Comment {
  commentID: string;
  postID: string;
  userID: string;
  comment: string;
  created_at: Date;
}
export interface fetchAllComments {
  commentID: string;
  postID: string;
  userID: string;
  comment: string;
  created_at: Date;
  isDeleted: boolean;
  fullname: string;
  parentCommentID: string;
}
