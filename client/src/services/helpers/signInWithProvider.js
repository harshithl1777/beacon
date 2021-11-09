import {
	GoogleAuthProvider,
	FacebookAuthProvider,
	GithubAuthProvider,
	signInWithPopup,
	getAuth,
} from 'firebase/auth';

const signInWithProvider = async (service) => {
	try {
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

		const auth = getAuth();
		const { user } = await signInWithPopup(auth, provider);
		return { success: true, user };
	} catch (error) {
		return { success: false, message: error };
	}
};

export default signInWithProvider;
