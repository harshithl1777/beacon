import LoginForm from 'containers/LoginForm';
import styles from 'pages/LoginPage.module.scss';

const LoginPage = () => {
	return (
		<div className={styles.pageWrapper}>
			<div className={styles.visualWrapper} />
			<div className={styles.loginWrapper}>
				<LoginForm />
			</div>
		</div>
	);
};

export default LoginPage;
