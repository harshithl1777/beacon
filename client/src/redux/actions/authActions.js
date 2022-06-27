import {
	GoogleAuthProvider,
	FacebookAuthProvider,
	GithubAuthProvider,
	signInWithPopup,
	getAuth,
	deleteUser,
	getAdditionalUserInfo,
} from 'firebase/auth';
import {
	AUTH_REDIRECT,
	LOG_IN_WITH_CREDENTIALS,
	LOG_IN_WITH_SOCIALS,
	LOG_OUT,
	REFRESH_SESSION,
} from 'redux/actions/types';
import { authAPI, usersAPI } from 'services/api';
import { showToast } from 'services/helpers';

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
		const currentUser = auth.currentUser;

		// Check if user account is new, if so throw error
		const { isNewUser } = getAdditionalUserInfo(result);
		if (isNewUser) {
			await deleteUser(currentUser);
			throw new Error('Account does not exist');
		}

		// Otherwise authenticate with server using email, social token and store response
		const user = result.user;
		const response = await authAPI.post({ email: user.email, socialToken: user.accessToken });
		dispatch({ type: LOG_IN_WITH_SOCIALS, ...response });
	} catch (error) {
		console.error(error);

		const errorMessage = error.toString();
		if (errorMessage === 'Error: Account does not exist') {
			showToast.error(
				'Account does not exist',
				"It seems like you haven't yet signed up with this social account."
			);
		}

		dispatch({ type: LOG_IN_WITH_SOCIALS, message: errorMessage, success: false });
	}
};

export const signUpWithCredentials = (email, password) => async (dispatch) => {
	const { success, payload } = await usersAPI.post({ email, password, method: 'Credentials' });
	dispatch({});
};

export const refreshSession = () => async (dispatch) => {
	const { success, payload } = await authAPI.put();
	dispatch({ type: REFRESH_SESSION, success, payload });
};

export const logOut = () => async (dispatch) => {
	const response = await authAPI.remove();
	window.location.href = process.env.REACT_APP_CLIENT_URL + '/auth/login';
	dispatch({ type: LOG_OUT, ...response });
};
