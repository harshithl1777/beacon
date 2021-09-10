import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from 'components/Button/Button.module.scss';

const Button = (props) => {
	const { text, type, disabled, ...rest } = props;

	return (
		<button {...rest} disabled={disabled}>
			{text}
		</button>
	);
};

Button.propTypes = {
	text: PropTypes.string.isRequired,
	type: PropTypes.oneOf(['primary', 'secondary', 'blue', 'purple', 'danger']),
	disabled: PropTypes.bool,
	icon: PropTypes.string,
};

Button.defaultProps = {
	type: 'primary',
	disabled: false,
	icon: null,
};

export default Button;
