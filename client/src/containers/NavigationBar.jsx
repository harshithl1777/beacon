import { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Icon, Button } from 'components';
import { logOut } from 'redux/actions/authActions';
import sliderMeasurements from 'assets/json/sliderMeasurements.json';
import styles from 'containers/NavigationBar.module.scss';

const NavigationBar = ({ logOut }) => {
    const [activeOption, setActiveOption] = useState(0);
    const [hoverOption, setHoverOption] = useState(null);
    const [offsetLeft, setOffsetLeft] = useState(-13);
    const [offsetWidth, setOffsetWidth] = useState(91);
    const navigate = useNavigate();

    const navigationOptionClicked = (optionClicked) => {
        setOffsetLeft(sliderMeasurements.offsetLeft[optionClicked] - 2);
        setOffsetWidth(sliderMeasurements.offsetWidth[optionClicked] + 4);
        setActiveOption(optionClicked);
    };

    const logOutClicked = async () => await logOut();

    return (
        <div className={styles.navigationBar}>
            <Icon name='CMLogo' size='medium' color='light' className={styles.navigationBarLogo} draggable='false' />
            <div className={styles.navigationContainer}>
                <div
                    style={{ left: `${offsetLeft}px`, width: `${offsetWidth}px` }}
                    className={styles.sliderIndicator}
                />
                <div className={styles.navigationOptionsContainer}>
                    <div
                        className={styles.navigationOption}
                        onMouseEnter={() => setHoverOption(0)}
                        onMouseLeave={() => setHoverOption(null)}
                        onClick={(e) => navigationOptionClicked(0)}
                    >
                        <Icon
                            name='CMDatabase'
                            color={activeOption === 0 || hoverOption === 0 ? 'light' : 'faded'}
                            draggable='false'
                        />
                        <h3
                            className={
                                activeOption === 0 || hoverOption === 0
                                    ? styles.navigationOptionTextActive
                                    : styles.navigationOptionText
                            }
                        >
                            Data
                        </h3>
                    </div>
                    <div
                        className={styles.navigationOption}
                        onMouseEnter={() => setHoverOption(1)}
                        onMouseLeave={() => setHoverOption(null)}
                        onClick={(e) => navigationOptionClicked(1)}
                    >
                        <Icon
                            name='CMReviews'
                            size='medium'
                            color={activeOption === 1 || hoverOption === 1 ? 'light' : 'faded'}
                            draggable='false'
                        />
                        <h3
                            className={
                                activeOption === 1 || hoverOption === 1
                                    ? styles.navigationOptionTextActive
                                    : styles.navigationOptionText
                            }
                        >
                            Reviews
                        </h3>
                    </div>
                </div>
            </div>
            <div className={styles.navigationBarLeftContainer}>
                <div className={styles.navigationBarButtonsContainer}>
                    <Button
                        variant='yellow'
                        className={styles.creditsCounterButton}
                        customIcon={<Icon name='CMCompass' color='dark' />}
                        style={{ pointerEvents: 'none' }}
                    >
                        20 Credits
                    </Button>
                    <Button
                        className={styles.contributeButton}
                        customIcon={<Icon name='CMContributions' color='dark' />}
                        onClick={() => navigate('/app/contribute')}
                    >
                        Contribute
                    </Button>
                </div>
                <div className={styles.navigationBarIconsContainer}>
                    <Icon
                        name='CMFeedback'
                        color='light'
                        className={styles.navigationBarIcon}
                        draggable='false'
                        onClick={() => window.open('mailto:hello@harshith.dev')}
                    />
                    <button onClick={logOutClicked} className={styles.logoutButton}>
                        <Icon
                            name='IoLogOutOutline'
                            color='light'
                            size='large'
                            className={styles.navigationBarIcon}
                            draggable='false'
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default connect(null, { logOut })(NavigationBar);
