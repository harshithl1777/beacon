import { Route, Redirect } from 'react-router-dom';
import { useAuth, useQuery } from 'services/hooks';

const GatewayRoute = ({ children, ...rest }) => {
	const [auth] = useAuth();
	const redirectURL = useQuery('redirect') || '/app/home';
	return (
		<Route
			{...rest}
			render={() => {
				return auth ? <Redirect to={redirectURL} /> : children;
			}}
		/>
	);
};

export default GatewayRoute;
