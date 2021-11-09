import { Route, Redirect } from 'react-router-dom';
import { useAuth } from 'services/hooks';

const ProtectedRoute = ({ children, ...rest }) => {
	const [auth] = useAuth();
	return (
		<Route
			{...rest}
			render={() => {
				return auth ? children : <Redirect to='/auth/login' />;
			}}
		/>
	);
};

export default ProtectedRoute;
