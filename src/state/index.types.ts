export interface Alert {
  title: string;
  type: 'default' | 'awaiting approval';
  message: string;
  dismissable?: boolean;
}

export interface InitialState {
  userIdentity: 'super-admin' | 'admin';
  apiBaseUrl: string;
  loginUrl: string;
  alert?: Alert;
  jwt?: string;
}

export interface StatusCode {
  code: 200 | 202 | 400 | 403 | 404 | 418 | 500;
}