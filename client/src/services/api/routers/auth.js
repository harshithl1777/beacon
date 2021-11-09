import APICore from 'services/api/utils/core';

const url = 'auth/session';

const authAPI = new APICore({
	get: true,
	post: true,
	put: true,
	delete: true,
	url: url,
});

export default authAPI;
