import { Link } from 'react-router-dom';
import { Input, Icon, Button } from 'components';
import { showToast, signInWithProvider } from 'services/helpers';
import { authAPI } from 'services/api';
import styles from 'containers/LoginForm.module.scss';

const LoginForm = () => {
	const socialLogin = async (service) => {
		const { success, user } = await signInWithProvider(service);
		if (!success) {
			showToast.error(`${service} Login Failed`, 'Please try again later.');
		} else {
			const { success, payload } = await authAPI.post({
				email: 'beacontestuser1@gmail.com',
				token: user.accessToken,
			});
			if (success) console.log(document.cookie);
			const res = await authAPI.get();
			console.log(res);
		}
	};

	return (
		<div className={styles.formWrapper}>
			<Icon className={styles.formLogo} name='CMLogo' color='light' size='large' />
			<h4 className={styles.formTitle}>Sign in to Beacon</h4>
			<p className={styles.formDescription}>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
				labore et dolore.
			</p>
			<Input wrapperClass={styles.formInput}>Email address</Input>
			<Input wrapperClass={styles.formInput} type='password'>
				Password
			</Input>
			<Button wrapperClass={styles.formSubmit}>Login to Beacon</Button>
			<div className={styles.formSeperatorWrapper}>
				<div className={styles.formSeperator} />
				<p className={styles.formSeperatorText}>OR</p>
				<div className={styles.formSeperator} />
			</div>
			<div className={styles.formSocialWrapper}>
				<Button
					className={styles.formGoogleLogin}
					type='secondary'
					customIcon={<Icon name='IoLogoGoogle' size={20} color='light' />}
					onClick={() => socialLogin('Google')}
				>
					Google
				</Button>
				<Button
					className={styles.formFacebookLogin}
					type='secondary'
					customIcon={<Icon name='IoLogoFacebook' size={20} color='light' />}
					onClick={() => socialLogin('Facebook')}
				>
					Facebook
				</Button>
				<Button
					className={styles.formGithubLogin}
					type='secondary'
					customIcon={<Icon name='IoLogoGithub' size={20} color='light' />}
					onClick={() => socialLogin('Github')}
				>
					Github
				</Button>
			</div>
			<h4 className={styles.formSignupOption}>
				Don't have an account yet?
				<Link to='/app/home'>
					<span className={styles.formSignupLink}> Sign up instead.</span>
				</Link>
			</h4>
		</div>
	);
};

export default LoginForm;
