import { SignupForm } from 'containers';
import authImage from 'assets/images/authImage.svg';
import styles from 'pages/SignupPage.module.scss';

const SignupPage = () => {
    return (
        <div className={styles.pageWrapper}>
            <div className={styles.signupWrapper}>
                <SignupForm />
            </div>
            <div className={styles.visualWrapper}>
                <img src={authImage} alt='web page with lock icon' />
                <div className={styles.visualWrapperText}>
                    <h3 className={styles.visualHeader}>Deciding where to shop shouldn’t be so difficult</h3>
                    <p className={styles.visualDescription}>
                        Beacon provides you with crowdsourced data to find the best grocery stores near you.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
