import { Link } from 'react-router-dom';

import { Input, Icon, Button } from 'components';
import styles from 'containers/LoginForm.module.scss';

const LoginForm = () => {
	return (
		<form className={styles.formWrapper}>
			<Icon className={styles.formLogo} name='CMLogo' color='light' size='large' />
			<h4 className={styles.formTitle}>Sign in to Beacon</h4>
			<p className={styles.formDescription}>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
				labore et dolore.
			</p>
			<Input positionClass={styles.formInput}>Email address</Input>
			<Input positionClass={styles.formInput} type='password'>
				Password
			</Input>
			<Button positionClass={styles.formSubmit}>Login to Beacon</Button>
			<h4 className={styles.formSignupOption}>
				Don't have an account yet?
				<Link to='/auth/signup'>
					<span className={styles.formSignupLink}> Sign up instead.</span>
				</Link>
			</h4>
		</form>
	);
};

export default LoginForm;
