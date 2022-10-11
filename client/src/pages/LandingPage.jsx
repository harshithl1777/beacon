import { connect } from 'react-redux';
import { Button, Icon } from 'components';
import landingPageImage from 'assets/images/landingPageImage.svg';
import styles from 'pages/LandingPage.module.scss';

const LandingPage = ({ auth }) => {
    return (
        <div className={styles.landingPageContainer}>
            <div className={styles.navigationBar}>
                <div className={styles.navigationLeftContent}>
                    <Icon
                        name='CMLogo'
                        size='large'
                        color='dark'
                        className={styles.navigationBarLogo}
                        draggable='false'
                    />
                    <a className={styles.navigationBarLink} href='https://github.com/harshithl1777/beacon'>
                        About
                    </a>
                    <a className={styles.navigationBarLink} href='https://github.com/harshithl1777/beacon'>
                        Github
                    </a>
                    <a className={styles.navigationBarLink} href='mailto:hello@harshith.dev'>
                        Contact
                    </a>
                </div>
                <div className={styles.navigationRightContent}>
                    {auth.isLoggedIn ? (
                        <Button
                            onClick={() => {
                                window.location.href = '/app/data';
                            }}
                            variant='secondary'
                            className={styles.signupButton}
                        >
                            Enter Beacon
                        </Button>
                    ) : (
                        <>
                            <Button
                                onClick={() => {
                                    window.location.href = '/auth/login';
                                }}
                                className={styles.logInButton}
                            >
                                Log In
                            </Button>
                            <Button
                                onClick={() => {
                                    window.location.href = '/auth/signup';
                                }}
                                variant='secondary'
                                className={styles.signupButton}
                            >
                                Sign Up
                            </Button>
                        </>
                    )}
                </div>
            </div>
            <div className={styles.landingContent}>
                <div className={styles.landingLeftContent}>
                    <h4 className={styles.headerCaption}>MEET BEACON</h4>
                    <h1 className={styles.landingHeader}>Crowdsourced store data for consumers in the pandemic </h1>
                    <p className={styles.landingDescription}>
                        With the added risk of COVID-19, it's become so difficult to figure out where to shop. That's
                        where Beacon comes in - a platform that provides you with stock and lines data to determine
                        where best to shop at.
                    </p>
                    <div className={styles.landingButtonContainer}>
                        <Button
                            onClick={() => {
                                window.location.href = '/auth/signup';
                            }}
                            variant='secondary'
                        >
                            Get started
                        </Button>
                        <Button onClick={() => window.open('https://github.com/harshithl1777/beacon')}>
                            Learn more
                        </Button>
                    </div>
                </div>
                <img src={landingPageImage} alt='stock data example' className={styles.landingContentImage} />
            </div>
            <div className={styles.footerBar}>
                <p className={styles.builtByText}>
                    Built by Harshith Latchupatula in <span className='bold'>open source</span>
                </p>
            </div>
        </div>
    );
};

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps, {})(LandingPage);
