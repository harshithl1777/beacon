import { useState, useEffect } from 'react';
import { authAPI } from 'services/api';

const useAuth = () => {
	const [auth, setAuth] = useState(null);

	useEffect(() => {
		const authFunctionality = async () => {
			if (auth === null) {
				const { success } = await authAPI.get();
				console.log(success);
				setAuth(success);
			}
		};

		authFunctionality();
	});

	return [auth, setAuth];
};

export default useAuth;
