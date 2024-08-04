export interface UserData {
  token: string;
  refresh_token: string;
  expires_in: number;
  user: User;
}

export interface User {
  _id: string;
  role: string;
  name: string;
  email: string;
  photo: string;
}
