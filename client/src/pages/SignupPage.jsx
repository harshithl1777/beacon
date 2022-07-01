import SignupForm from 'containers/SignupForm';
import styles from 'pages/SignupPage.module.scss';

const SignupPage = () => {
	return (
		<div className={styles.pageWrapper}>
			<div className={styles.signupWrapper}>
				<SignupForm />
			</div>
			<div className={styles.visualWrapper} />
		</div>
	);
};

export default SignupPage;
