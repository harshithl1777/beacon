import PropTypes from 'prop-types';
import classnames from 'classnames';

import { Icon, Spinner } from 'components';
import styles from 'components/Button.module.scss';

const Button = (props) => {
	const { text, type, disabled, icon, children, customIcon, loading, onClick, className, ...rest } =
		props;

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
				styles[type],
				className
			)}
			{...rest}
			disabled={disabled || loading}
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
	children: PropTypes.node.isRequired,
	type: PropTypes.oneOf(['primary', 'secondary', 'danger', 'blue', 'purple', 'yellow']),
	disabled: PropTypes.bool,
	icon: PropTypes.string,
	customIcon: PropTypes.element,
	loading: PropTypes.bool,
	onClick: PropTypes.func,
	className: PropTypes.string,
};

Button.defaultProps = {
	type: 'primary',
	disabled: false,
	icon: null,
	customIcon: null,
	loading: false,
	onClick: () => {},
	className: '',
};

export default Button;
