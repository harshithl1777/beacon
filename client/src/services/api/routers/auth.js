import APICore from 'services/api/utils/core';

const url = 'auth/session';

const authAPI = new APICore({
	get: true,
	post: true,
	put: true,
	remove: true,
	url: url,
});

export default authAPI;
