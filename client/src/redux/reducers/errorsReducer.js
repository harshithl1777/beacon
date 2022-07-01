const errorReducer = (state = [], { type, success, payload, code }) => {
	if (success) {
		return state.filter(({ action }) => action !== type);
	} else if (success === false) {
		const newError = {
			action: type,
			message: payload,
			code: code,
		};
		return [...state, newError];
	} else {
		return state;
	}
};

export default errorReducer;
