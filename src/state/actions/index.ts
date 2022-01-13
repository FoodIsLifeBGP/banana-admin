import { StatusCode } from '../index.types';

export interface Actions {
	logIn: () => Promise<StatusCode>;
	logOut: () => Promise<void>;
	register: () => Promise<StatusCode>;
	requestResetToken: () => Promise<StatusCode>;
	submitResetToken: () => Promise<StatusCode>;
	submitNewPassword: () => Promise<StatusCode>;
}
export { logIn, logOut } from './auth';
export { register } from './register';
export { updateAlert, clearAlert } from './alert';
export { requestResetToken, submitResetToken, submitNewPassword } from './passwordReset';
