import PropTypes from 'prop-types';
import classnames from 'classnames';

const Input = ({ label, type, size, disabled }) => {};

Input.propTypes = {
	label: PropTypes.string.required,
	type: PropTypes.oneOf(['default', 'success', 'warning', 'error']),
	// size
	disabled: PropTypes.bool,
};

Input.defaultProps = {
	type: 'default',
	disabled: false,
};

export default Input;
