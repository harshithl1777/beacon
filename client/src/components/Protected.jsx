import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { Icon } from 'components';
import { useQuery } from 'services/hooks';
import styles from 'components/Protected.module.scss';

const Protected = ({ children, auth }) => {
	const { pathname } = useLocation();
	const refreshedSession = useQuery('refreshed');
	const [render, setRender] = useState(null);

	useEffect(() => {
		const abortController = new AbortController();
		const timeoutChangeRender = async () => {
			setTimeout(() => {
				if (!abortController.signal.aborted) setRender(true);
			}, 2000);
		};
		timeoutChangeRender();
		return () => {
			abortController.abort();
		};
	}, []);

	const getRenderOutput = () => {
		if (refreshedSession === 'true' && render === null) {
			return (
				<div className={styles.animationContainer}>
					<Icon
						name='CMLogo'
						size='massive'
						color='light'
						className='animate__animated animate__fadeInUp'
					/>
				</div>
			);
		} else {
			return children;
		}
	};

	return auth.isLoggedIn ? getRenderOutput() : <Navigate to={'/auth/login?redirect=' + pathname} />;
};

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(Protected);
