export const handleResponse = (response) => {
	if (response.data) return response.data;
	return response;
};

export const handleError = (error) => {
	if (error.response) return error.response.data;
	return error;
};
