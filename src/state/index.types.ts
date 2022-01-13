export interface Alert {
  title: string;
  type: 'default' | 'awaiting approval';
  message: string;
  dismissable?: boolean;
}

export interface UserState {
  email: string;
  password: string;
  address_city: string;
  address_state: string;
  address_zip: string;
  account_status: string;
}
export interface InitialState {
  userIdentity: string;
  apiBaseUrl: string;
  createUrl: string;
  loginUrl: string;
  alert?: Alert;
  jwt?: string;
  user?: UserState;
}

export interface StatusCode {
  code: 200 | 202 | 400 | 403 | 404 | 418 | 500;
}