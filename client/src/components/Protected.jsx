import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { AuthRedirect } from 'containers';

const Protected = ({ children }) => {
	const { state, pathname } = useLocation();
	return state && state.passedRedirect ? children : <AuthRedirect origin={pathname} />;
};

Protected.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Protected;
