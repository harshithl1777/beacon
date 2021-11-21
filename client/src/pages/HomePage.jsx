import { connect } from 'react-redux';
import { logOut } from 'redux/actions/authActions';

const HomePage = ({ logOut }) => {
	const logout = async () => await logOut();

	return <button onClick={logout}>Logout</button>;
};

const mapStateToProps = ({ errors }) => ({ errors });

export default connect(mapStateToProps, { logOut })(HomePage);
