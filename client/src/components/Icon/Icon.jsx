import PropTypes from 'prop-types';
import * as ionicons from 'react-icons/io5';

const sizes = {
	small: 20,
	medium: 28,
	large: 38,
	massive: 50,
};

const colors = { light: '#ffffff', dark: '#001c36' };

const Icon = (props) => {
	const { name, color, size, className } = props;
	const IconComponent = ionicons[name];

	return (
		<IconComponent
			color={colors[color] || color}
			size={sizes[size] || size}
			className={className}
		/>
	);
};

Icon.propTypes = {
	name: PropTypes.string.isRequired,
	color: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf(['light', 'dark'])]),
	size: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.oneOf(['small', 'medium', 'large', 'massive']),
	]),
	className: PropTypes.string,
};

Icon.defaultProps = {
	color: 'dark',
	size: 'medium',
	className: '',
};

export default Icon;
