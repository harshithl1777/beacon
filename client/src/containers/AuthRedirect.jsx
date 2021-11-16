import { Icon, Spinner } from 'components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from 'services/api';
import styles from 'containers/AuthRedirect.module.scss';

const AuthRedirect = ({ origin }) => {
	const [icon, setIcon] = useState('spinner');
	const navigate = useNavigate();

	useEffect(() => {
		const attemptSessionRefresh = async () => {
			setTimeout(async () => {
				const { success } = await authAPI.get();
				if (success) {
					setIcon('logo');
					setTimeout(() => {
						navigate(origin || '/app/home', { state: { passedRedirect: true } });
					}, 1200);
				} else {
					setTimeout(() => {
						navigate(`/auth/login?redirect=${origin || '/app/home'}`, {
							state: { passedRedirect: true },
						});
					}, 1200);
				}
			}, 1000);
		};

		attemptSessionRefresh();
	});
	return (
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
	);
};

export default AuthRedirect;
