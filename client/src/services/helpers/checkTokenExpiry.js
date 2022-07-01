import jwt from 'jsonwebtoken';

const checkTokenExpiry = (token) => {
	const { payload } = jwt.decode(token, { complete: true });
	const expiryTime = payload.exp * 1000;
	const utcTimestamp = new Date().getTime();
	if (utcTimestamp > expiryTime) return false;
	return true;
};

export default checkTokenExpiry;
