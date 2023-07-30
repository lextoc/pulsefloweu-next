export interface Cookies {
  ["access-token"]: string;
  client: string;
  uid: string;
}

export interface User {
  allow_password_change?: boolean;
  email?: string;
  id?: number;
  avatar?: string;
  first_name?: string;
  last_name?: string;
  username?: string;
  provider?: string;
  uid?: string;
}
