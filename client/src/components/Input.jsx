import { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { Icon } from 'components';
import styles from 'components/Input.module.scss';

const Input = ({ label, state, disabled, onChange }) => {
	const [value, setValue] = useState('');

	return (
		<>
			<input
				id='inputUsername'
				className={classnames(styles.floatingInput, styles[state])}
				name='username'
				type='text'
				placeholder='Username'
				value={value}
				onChange={(e) => {
					setValue(e.target.value);
					onChange(e.target.value);
				}}
				disabled={disabled}
			/>
			<label
				for='inputUsername'
				className={classnames(styles.floatingLabel, styles[`${state}Label`])}
				data-content='Username'
			>
				<span className={styles.hiddenVisually}>{label}</span>
			</label>
		</>
	);
};

Input.propTypes = {
	label: PropTypes.string.isRequired,
	state: PropTypes.oneOf(['default', 'success', 'warning', 'error']),
	disabled: PropTypes.bool,
	onChange: PropTypes.func,
};

Input.defaultProps = {
	type: 'default',
	disabled: false,
	onChange: () => {},
};

export default Input;
