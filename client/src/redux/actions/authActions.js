import {
	GoogleAuthProvider,
	FacebookAuthProvider,
	GithubAuthProvider,
	signInWithPopup,
	getAuth,
	getAdditionalUserInfo,
} from 'firebase/auth';
import {
	LOG_IN_WITH_CREDENTIALS,
	LOG_IN_WITH_SOCIALS,
	LOG_OUT,
	REFRESH_SESSION,
} from 'redux/actions/types';
import { authAPI } from 'services/api';

export const logInWithCredentials = (email, password) => async (dispatch) => {
	const response = await authAPI.post({ email, password });
	dispatch({ type: LOG_IN_WITH_CREDENTIALS, ...response });
};

export const logInWithSocials = (service) => async (dispatch) => {
	try {
		// Determine provider and add scopes accordingly
		let provider;
		switch (service) {
			case 'Facebook':
				provider = new FacebookAuthProvider();
				provider.addScope('email');
				break;
			case 'Github':
				provider = new GithubAuthProvider();
				provider.addScope('user:email');
				break;
			default:
				provider = new GoogleAuthProvider();
				provider.addScope('https://www.googleapis.com/auth/userinfo.email');
		}

		// Initiate social login popup
		const auth = getAuth();
		const result = await signInWithPopup(auth, provider);

		// Check if user account is new, if so throw error
		const { isNewUser } = getAdditionalUserInfo(result);
		if (isNewUser) throw new Error('No matching account found');

		// Otherwise authenticate with server and store response
		const user = result.user;
		const response = await authAPI.post({ email: user.email, token: user.accessToken });
		dispatch({ type: LOG_IN_WITH_SOCIALS, ...response });
	} catch (error) {
		console.error(error);
		dispatch({ type: LOG_IN_WITH_SOCIALS, message: error.toString(), error: true });
	}
};

export const logout = () => {
	return { type: LOG_OUT };
};

export const refreshSession = (newAccessToken) => {
	const payload = { newAccessToken };
	return { type: REFRESH_SESSION, payload };
};
