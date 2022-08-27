import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { Input, Icon, Button } from 'components';
import { useQuery } from 'services/hooks';
import { logInWithSocials, logInWithCredentials } from 'redux/actions/authActions';
import styles from 'containers/LoginForm.module.scss';

const LoginForm = (props) => {
    const { auth, logInWithSocials, logInWithCredentials } = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const redirectURL = useQuery('redirect') || '/app/data';

    const socialLogin = async (service) => logInWithSocials(service);

    const credentialsLogin = async (event) => {
        event.preventDefault();
        logInWithCredentials(email, password);
    };

    return auth.isLoggedIn ? (
        <Navigate to={redirectURL} />
    ) : (
        <div className={styles.formWrapper} onSubmit={(e) => credentialsLogin(e)}>
            <form className={styles.form}>
                <Icon className={styles.formLogo} name='CMLogo' color='light' size='massive' />
                <h4 className={styles.formTitle}>Sign in to Beacon</h4>
                <p className={styles.formDescription}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.
                </p>
                <Input wrapperClass={styles.formInput} value={email} onChange={setEmail}>
                    Email address
                </Input>
                <Input wrapperClass={styles.formInput} type='password' value={password} onChange={setPassword}>
                    Password
                </Input>
                <Button type='submit' wrapperClass={styles.formSubmit}>
                    Login to Beacon
                </Button>
                <div className={styles.formSeperatorWrapper}>
                    <div className={styles.formSeperator} />
                    <p className={styles.formSeperatorText}>OR</p>
                    <div className={styles.formSeperator} />
                </div>
                <div className={styles.formSocialWrapper}>
                    <Button
                        className={styles.formGoogleLogin}
                        type='button'
                        variant='secondary'
                        customIcon={<Icon name='IoLogoGoogle' size={20} color='light' />}
                        onClick={() => socialLogin('Google')}
                    >
                        Google
                    </Button>
                    <Button
                        className={styles.formFacebookLogin}
                        type='button'
                        variant='secondary'
                        customIcon={<Icon name='IoLogoFacebook' size={20} color='light' />}
                        onClick={() => socialLogin('Facebook')}
                    >
                        Facebook
                    </Button>
                    <Button
                        className={styles.formGithubLogin}
                        type='button'
                        variant='secondary'
                        customIcon={<Icon name='IoLogoGithub' size={20} color='light' />}
                        onClick={() => socialLogin('Github')}
                    >
                        Github
                    </Button>
                </div>
            </form>
            <h4 className={styles.formSignupOption}>
                Don't have an account yet?
                <a href={`/auth/signup?redirect=${redirectURL}`}>
                    <span className={styles.formSignupLink}> Sign up instead.</span>
                </a>
            </h4>
        </div>
    );
};

const mapStateToProps = ({ auth, errors }) => ({ auth, errors });

export default connect(mapStateToProps, {
    logInWithSocials,
    logInWithCredentials,
})(LoginForm);
