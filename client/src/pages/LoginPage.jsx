import { LoginForm } from 'containers';
import authImage from 'assets/images/authImage.svg';
import styles from 'pages/LoginPage.module.scss';

const LoginPage = () => {
    return (
        <div className={styles.pageWrapper}>
            <div className={styles.visualWrapper}>
                <img src={authImage} alt='web page with lock icon' />
                <div className={styles.visualWrapperText}>
                    <h3 className={styles.visualHeader}>Deciding where to shop shouldn’t be so difficult</h3>
                    <p className={styles.visualDescription}>
                        Beacon provides you with crowdsourced data to find the best grocery stores near you.
                    </p>
                </div>
            </div>
            <div className={styles.loginWrapper}>
                <LoginForm />
            </div>
        </div>
    );
};

export default LoginPage;
