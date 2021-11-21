import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

import { Icon, Spinner } from 'components';
import { authAPI } from 'services/api';
import { authRedirect } from 'redux/actions/authActions';
import styles from 'containers/AuthRedirect.module.scss';

const AuthRedirect = ({ origin, auth, authRedirect }) => {
	console.log(auth);
	const [icon, setIcon] = useState('spinner');

	useEffect(() => {
		const attemptSessionRefresh = async () => {
			setTimeout(async () => {
				const { success } = await authAPI.get();
				if (success) {
					setIcon('logo');
					setTimeout(() => authRedirect('protected'), 1200);
				} else {
					setTimeout(() => authRedirect('login'), 1200);
				}
			}, 1000);
		};

		attemptSessionRefresh();
	});

	return auth.redirectLocation === null ? (
		<div className={styles.loadingContainer}>
			{icon === 'spinner' ? (
				<Spinner size='massive' color='green' />
			) : (
				<Icon
					name='CMLogo'
					size='massive'
					color='light'
					className='animate__animated animate__fadeInUp'
				/>
			)}
		</div>
	) : (
		<Navigate
			to={
				auth.redirectLocation === 'protected'
					? origin || '/app/home'
					: `/auth/login?redirect=${origin || '/app/home'}`
			}
		/>
	);
};

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps, { authRedirect })(AuthRedirect);
