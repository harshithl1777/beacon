import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { submitContribution } from 'redux/actions/contributionsActions';
import { Spinner } from 'components';
import styles from 'pages/SubmitContributionPage.module.scss';

const SubmitContributionPage = ({ contributions, submitContribution }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (contributions.storeID) {
            setTimeout(() => {
                submitContribution(contributions);
                navigate('/app/data');
            }, 2000);
        }
    }, []);

    return contributions.storeID ? (
        <div className={styles.spinnerContainer}>
            <div className={styles.contentContainer}>
                <Spinner color='green' size='massive' circleClassName={styles.spinnerCircle} />
                <h3 className={styles.spinnerSubtitle}>Submitting your contribution</h3>
            </div>
        </div>
    ) : (
        <Navigate to='/404' />
    );
};

const mapStateToProps = ({ contributions }) => ({ contributions });

export default connect(mapStateToProps, { submitContribution })(SubmitContributionPage);
