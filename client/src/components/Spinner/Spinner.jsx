import PropTypes from 'prop-types';

import styles from 'components/Spinner/Spinner.module.scss';

const sizes = {
	small: 20,
	medium: 28,
	large: 38,
	massive: 50,
};

const Spinner = ({ color, size }) => {
	return (
		<div className={styles[`size-${sizes[size] || size}`]}>
			<div className={styles[color]} />
		</div>
	);
};

Spinner.propTypes = {
	color: PropTypes.oneOf(['light', 'dark']),
	size: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.oneOf(['small', 'medium', 'large', 'massive']),
	]),
};

Spinner.defaultProps = {
	color: 'dark',
	size: 'medium',
};
