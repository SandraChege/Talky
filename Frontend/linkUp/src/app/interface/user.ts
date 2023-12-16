export interface UserDetails {
  username: string;
  fullname: string;
  email: string;
  password: string;
}
export interface loginUserDetails {
  email: string;
  password: string;
}

export interface resetPasswordDetails {
  email: string;
  newPassword: string;
  resetToken: string;
}

export interface getAllUsers {
  userID: string;
  username: string;
  email: string;
  fullname: string;
  password: string;
  role: string;
  profileUrl: string;
  profileCaption: string;
  isWelcomed: boolean;
  isDeleted: boolean;
  resetPassword: string;
  resetToken: string;
}
