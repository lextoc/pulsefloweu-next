export interface Cookies {
  ["access-token"]: string;
  client: string;
  uid: string;
}

export interface User {
  allow_password_change?: boolean;
  email?: string;
  id?: number;
  image?: string;
  name?: string;
  nickname?: string;
  provider?: string;
  uid?: string;
}
