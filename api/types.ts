export interface ICookies {
  accessToken: string;
  client: string;
  uid: string;
}

export interface IUser {
  allow_password_change?: boolean;
  email?: string;
  id?: number;
  image?: string;
  name?: string;
  nickname?: string;
  provider?: string;
  uid?: string;
}
