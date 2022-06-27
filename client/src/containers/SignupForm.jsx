import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { Input, Icon, Button } from 'components';
import { useQuery } from 'services/hooks';
import { showToast } from 'services/helpers';
import { signUpWithSocials, signUpWithCredentials } from 'redux/actions/authActions';
import styles from 'containers/SignupForm.module.scss';

const SignUpForm = (props) => {
	const { auth, signUpWithCredentials, signUpWithSocials } = props;
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmedPassword, setConfirmedPassword] = useState('');
	const redirectURL = useQuery('redirect') || '/app/home';

	const credentialsSignUp = async (event) => {
		event.preventDefault();
		if (password !== confirmedPassword) {
			showToast.error('Passwords do not match');
		} else {
			signUpWithCredentials(email, password);
		}
	};

	const socialSignUp = (service) => signUpWithSocials(service);

	return auth.isLoggedIn ? (
		<Navigate to={redirectURL} />
	) : (
		<div className={styles.formWrapper} onSubmit={(e) => credentialsSignUp(e)}>
			<form className={styles.form}>
				<Icon className={styles.formLogo} name='CMLogo' color='light' size='large' />
				<h4 className={styles.formTitle}>Get started with Beacon</h4>
				<p className={styles.formDescription}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
					ut labore et dolore.
				</p>
				<Input wrapperClass={styles.formInput} value={email} onChange={setEmail}>
					Email address
				</Input>
				<Input
					wrapperClass={styles.formInput}
					type='password'
					value={password}
					onChange={setPassword}
				>
					Password
				</Input>
				<Input
					wrapperClass={styles.formInput}
					type='password'
					value={confirmedPassword}
					onChange={setConfirmedPassword}
				>
					Confirm password
				</Input>
				<Button
					onClick={(e) => credentialsSignUp(e)}
					type='submit'
					wrapperClass={styles.formSubmit}
				>
					Sign up for Beacon
				</Button>
				<div className={styles.formSeperatorWrapper}>
					<div className={styles.formSeperator} />
					<p className={styles.formSeperatorText}>OR</p>
					<div className={styles.formSeperator} />
				</div>
				<div className={styles.formSocialWrapper}>
					<Button
						className={styles.formGoogleSignUp}
						type='button'
						variant='secondary'
						customIcon={<Icon name='IoLogoGoogle' size={20} color='light' />}
						onClick={() => socialSignUp('Google')}
					>
						Google
					</Button>
					<Button
						className={styles.formFacebookSignUp}
						type='button'
						variant='secondary'
						customIcon={<Icon name='IoLogoFacebook' size={20} color='light' />}
						onClick={() => socialSignUp('Facebook')}
					>
						Facebook
					</Button>
					<Button
						className={styles.formGithubSignUp}
						type='button'
						variant='secondary'
						customIcon={<Icon name='IoLogoGithub' size={20} color='light' />}
						onClick={() => socialSignUp('Github')}
					>
						Github
					</Button>
				</div>
			</form>
			<h4 className={styles.formSignUpOption}>
				Already have an account?
				<a href={`/auth/login?redirect=${redirectURL}`}>
					<span className={styles.formSignUpLink}> Login instead.</span>
				</a>
			</h4>
		</div>
	);
};

const mapStateToProps = ({ auth, errors }) => ({ auth, errors });

export default connect(mapStateToProps, { signUpWithCredentials, signUpWithSocials })(SignUpForm);
