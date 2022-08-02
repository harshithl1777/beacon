import PropTypes from 'prop-types';
import classnames from 'classnames';

import { Icon, Tooltip } from 'components';
import styles from 'components/Input.module.scss';

const Input = (props) => {
	const { children, label, variant, disabled, onChange, wrapperClass, className, value, tooltip, tooltipOptions, ...rest } = props;

	const getIcon = () => {
		const iconClassName = children ? styles.inputIcon : styles.inputIconNoPlaceholder;
		if (variant === 'warning') return <Icon className={iconClassName} name='IoAlertCircle' color='yellow' />;
		else if (variant === 'error') return <Icon className={iconClassName} name='IoCloseCircle' color='red' />;
		else if (variant === 'success') return <Icon className={iconClassName} name='IoCheckmarkCircle' color='green' />;
		return null;
	};

	return (
		<div className={classnames(styles.inputWrapper, wrapperClass)}>
			{!children && label && <label className={styles.floatingLabel}>{label}</label>}
			<div className={styles.inputContentWrapper}>
				{getIcon()}
				<Tooltip message={tooltip} {...tooltipOptions}>
					<input
						id={`${children}`}
						className={classnames(styles.floatingInput, styles[variant], children && styles.withPlaceholder, className)}
						name='input'
						value={value}
						placeholder={children}
						onChange={(e) => onChange(e.target.value)}
						disabled={disabled}
						{...rest}
					/>
				</Tooltip>
				{children && <label className={classnames(styles.floatingPlaceholder, styles[`${variant}Label`])} data-content={children}></label>}
			</div>
		</div>
	);
};

Input.propTypes = {
	children: PropTypes.string,
	label: PropTypes.string,
	value: PropTypes.string,
	variant: PropTypes.oneOf(['default', 'success', 'warning', 'error']),
	disabled: PropTypes.bool,
	onChange: PropTypes.func,
	tooltip: PropTypes.string,
	tooltipOptions: PropTypes.object,
	className: PropTypes.string,
	wrapperClass: PropTypes.string,
};

Input.defaultProps = {
	children: '',
	label: '',
	type: 'default',
	value: '',
	disabled: false,
	onChange: () => {},
	tooltip: '',
	tooltipOptions: {},
	className: '',
	wrapperClass: '',
};

export default Input;
