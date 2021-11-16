import {
	LOG_IN_WITH_CREDENTIALS,
	LOG_IN_WITH_SOCIALS,
	LOG_OUT,
	REFRESH_SESSION,
} from 'redux/actions/types';

const INITIAL_STATE = {
	isLoggedIn: false,
	userID: null,
	accessToken: null,
};

const authReducer = (state = INITIAL_STATE, { type, success, payload }) => {
	if (!success) return state;
	switch (type) {
		case LOG_IN_WITH_CREDENTIALS:
		case LOG_IN_WITH_SOCIALS:
			return {
				...state,
				isLoggedIn: true,
				userID: payload._id,
				accessToken: payload.access_token,
			};
		case REFRESH_SESSION:
			return { ...state, accessToken: payload.access_token };
		case LOG_OUT:
			return INITIAL_STATE;
		default:
			return state;
	}
};

export default authReducer;
