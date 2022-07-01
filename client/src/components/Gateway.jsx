import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Spinner } from 'components';
import { useQuery } from 'services/hooks';
import { refreshSession } from 'redux/actions/authActions';
import styles from 'components/Gateway.module.scss';

const Gateway = ({ children, auth, refreshSession }) => {
	const redirectURL = useQuery('redirect') || '/app/home';
	const [checkStatus, setCheckStatus] = useState(null);

	useEffect(() => {
		setTimeout(async () => {
			await refreshSession();
			if (!auth.isLoggedIn) setCheckStatus('COMPLETED');
		}, 1000);
	}, []);

	const getRenderOutput = () => {
		if (auth.isLoggedIn === null && checkStatus === null) {
			return (
				<div className={styles.loadingContainer}>
					<Spinner size='massive' color='green' />
				</div>
			);
		} else if (auth.isLoggedIn === null && checkStatus === 'COMPLETED') {
			return children;
		}
	};

	return auth.isLoggedIn ? <Navigate to={redirectURL + '?refreshed=true'} /> : getRenderOutput();
};

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps, { refreshSession })(Gateway);
