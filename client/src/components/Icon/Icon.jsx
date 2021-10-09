import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from 'components/Icon/Icon.module.scss';

const Icon = (props) => {
	const { name, color, stroke, size, ...rest } = props;

	return (
		<ion-icon
			className={classnames(
				name.includes('outline') && styles[`stroke-${stroke}`],
				styles[`size-${size}`],
				styles[`color-${color}`]
			)}
			name={name}
			{...rest}
		></ion-icon>
	);
};

Icon.propTypes = {
	name: PropTypes.string.isRequired,
	color: PropTypes.oneOf(['light', 'dark']),
	stroke: PropTypes.number,
	size: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.oneOf(['small', 'medium', 'large', 'massive']),
	]),
};

Icon.defaultProps = {
	color: 'dark',
	stroke: 32,
	size: 'medium',
};

export default Icon;
