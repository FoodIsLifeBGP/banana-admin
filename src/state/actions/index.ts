import { Donation, Claim, StatusCode } from '@state/index.types';

export interface Actions {
	getActiveDonationsForClient: () => Promise<Donation[] | []>;
	getClaimedDonationsForClient: () => Promise<Donation[] | Claim[] | []>;
	getClaimHistoryForClient: () => Promise<Donation[]| Claim[] | []>;
	getDonations: () => Promise<Donation[] | []>;
	getDonationHistory: () => Promise<Donation[] | []>;
	logIn: () => Promise<StatusCode>;
	logOut: () => Promise<void>;
	register: () => Promise<StatusCode>;
	scan: () => Promise<StatusCode>;
	requestResetToken: () => Promise<StatusCode>;
	submitResetToken: () => Promise<StatusCode>;
	submitNewPassword: () => Promise<StatusCode>;
}
export { getActiveDonationsForClient } from './getActiveDonationsForClient';
export { getClaimedDonationsForClient } from './getClaimedDonationsForClient';
export { getClaimHistoryForClient } from './getClaimHistoryForClient';
export { getDonations } from './getDonations';
export { getDonationHistory } from './getDonationHistory';
export { getLocation } from './getLocation';
export { logIn, logOut } from './auth';
export { postDonation } from './postDonation';
export { cancelDonation } from './cancelDonation';
export { claimDonation } from './claimDonation';
export { getTravelTimes } from './hereApi';
export { register } from './register';
export { scan } from './scan';
export { updateAlert, clearAlert } from './alert';
export { requestResetToken, submitResetToken, submitNewPassword } from './passwordReset';
