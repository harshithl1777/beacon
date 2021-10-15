import PropTypes from 'prop-types';
import classnames from 'classnames';

import { Icon } from 'components';
import styles from 'components/Button/Button.module.scss';

const Button = (props) => {
	const { text, type, disabled, icon, children, customIcon, loading, ...rest } = props;

	// check if icon name or customIcon exists, otherwise return empty fragment
	const getIconToRender = () => {
		if (icon) return <Icon name={icon} color={type === 'secondary' ? 'light' : 'dark'} />;
		else if (customIcon) return customIcon;
		return <></>;
	};

	return (
		<button
			className={classnames(styles.button, icon && styles.iconButton, styles[type])}
			{...rest}
			disabled={disabled}
		>
			{!loading && getIconToRender()}
			{children}
		</button>
	);
};

Button.propTypes = {
	children: PropTypes.string.isRequired,
	type: PropTypes.oneOf(['primary', 'secondary', 'blue', 'purple', 'danger']),
	disabled: PropTypes.bool,
	icon: PropTypes.string,
	customIcon: PropTypes.element,
	loading: PropTypes.bool,
};

Button.defaultProps = {
	type: 'primary',
	disabled: false,
	icon: null,
	customIcon: null,
	loading: false,
};

export default Button;
