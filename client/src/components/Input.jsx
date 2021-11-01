import { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { Icon, Tooltip } from 'components';
import styles from 'components/Input.module.scss';

const Input = (props) => {
	const {
		children,
		label,
		state,
		disabled,
		onChange,
		positionClass,
		className,
		forcedValue,
		options,
		tooltip,
		tooltipOptions,
	} = props;
	const [value, setValue] = useState(forcedValue);

	const getIcon = () => {
		const iconClassName = children ? styles.inputIcon : styles.inputIconNoPlaceholder;
		if (state === 'warning')
			return <Icon className={iconClassName} name='IoAlertCircle' color='yellow' />;
		else if (state === 'error')
			return <Icon className={iconClassName} name='IoCloseCircle' color='red' />;
		else if (state === 'success')
			return <Icon className={iconClassName} name='IoCheckmarkCircle' color='green' />;
		return null;
	};

	return (
		<div className={classnames(styles.inputWrapper, positionClass)}>
			{!children && label && <label className={styles.floatingLabel}>{label}</label>}
			<div className={styles.inputContentWrapper}>
				{getIcon()}
				<Tooltip message={tooltip} {...tooltipOptions}>
					<input
						id='input'
						className={classnames(
							styles.floatingInput,
							styles[state],
							children && styles.withPlaceholder,
							className
						)}
						name='input'
						placeholder={children}
						value={value}
						onChange={(e) => {
							setValue(e.target.value);
							onChange(e.target.value);
						}}
						disabled={disabled}
						{...options}
					/>
				</Tooltip>
				{children && (
					<label
						for='input'
						className={classnames(styles.floatingPlaceholder, styles[`${state}Label`])}
						data-content={children}
					></label>
				)}
			</div>
		</div>
	);
};

Input.propTypes = {
	children: PropTypes.string,
	label: PropTypes.string,
	forcedValue: PropTypes.string,
	state: PropTypes.oneOf(['default', 'success', 'warning', 'error']),
	disabled: PropTypes.bool,
	onChange: PropTypes.func,
	options: PropTypes.object,
	tooltip: PropTypes.string,
	tooltipOptions: PropTypes.object,
};

Input.defaultProps = {
	children: '',
	label: '',
	type: 'default',
	forcedValue: '',
	disabled: false,
	onChange: () => {},
	options: {},
	tooltip: null,
	tooltipOptions: {},
};

export default Input;
