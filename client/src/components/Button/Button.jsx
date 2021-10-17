import PropTypes from 'prop-types';
import classnames from 'classnames';

import { Icon, Spinner } from 'components';
import styles from 'components/Button/Button.module.scss';

const Button = (props) => {
	const { text, type, disabled, icon, children, customIcon, loading, onClick, ...rest } = props;

	// check if icon name or customIcon exists, otherwise return empty fragment
	const getIconToRender = () => {
		if (icon) return <Icon name={icon} color={type === 'secondary' ? 'light' : 'dark'} />;
		else if (customIcon) return customIcon;
		return <></>;
	};

	return (
		<button
			className={classnames(
				styles.button,
				icon && styles.iconButton,
				loading && styles.loading,
				disabled && styles.disabled,
				styles[type]
			)}
			{...rest}
			disabled={disabled || loading}
			clickable={false}
			onClick={onClick}
		>
			{!loading && getIconToRender()}
			{loading && (
				<Spinner className={styles.buttonSpinner} color={type === 'secondary' ? 'light' : 'dark'} />
			)}
			<p>{children}</p>
		</button>
	);
};

Button.propTypes = {
	children: PropTypes.string.isRequired,
	type: PropTypes.oneOf(['primary', 'secondary', 'danger', 'blue', 'purple', 'yellow']),
	disabled: PropTypes.bool,
	icon: PropTypes.string,
	customIcon: PropTypes.element,
	loading: PropTypes.bool,
	onClick: PropTypes.func,
};

Button.defaultProps = {
	type: 'primary',
	disabled: false,
	icon: null,
	customIcon: null,
	loading: false,
	onClick: () => alert('hi'),
};

export default Button;
