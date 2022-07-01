import axios from 'axios';
import { useSelector } from 'react-redux';
import { getAccessToken, getLoggedInStatus } from 'redux/selectors/authSelectors';
import { refreshSession } from 'redux/actions/authActions';
import { checkTokenExpiry } from 'services/helpers';

axios.interceptors.request.use((config) => {
	const url = config.url;
	console.log(url);
	const isLoggedIn = useSelector(getLoggedInStatus);
	if (isLoggedIn) {
		const accessToken = useSelector(getAccessToken);
		const tokenExpiry = checkTokenExpiry(accessToken);
		if (!tokenExpiry) refreshSession();
	}
	return config;
});
