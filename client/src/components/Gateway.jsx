import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { AuthRedirect } from 'containers';

const Gateway = ({ children }) => {
	const { state } = useLocation();
	return state && state.passedRedirect ? children : <AuthRedirect />;
};

Gateway.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Gateway;
