import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from 'components/Spinner/Spinner.module.scss';

const sizes = {
	small: 20,
	medium: 28,
	large: 38,
	massive: 50,
};

const Spinner = ({ color, size, className }) => {
	return (
		<div className={classnames(styles[`size-${sizes[size]}`], className)}>
			<div className={classnames(styles[color], styles.circle)} />
		</div>
	);
};

Spinner.propTypes = {
	color: PropTypes.oneOf(['light', 'dark']),
	size: PropTypes.oneOf(['small', 'medium', 'large', 'massive']),
	className: PropTypes.string,
};

Spinner.defaultProps = {
	color: 'dark',
	size: 'medium',
	className: '',
};

export default Spinner;
