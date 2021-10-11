import PropTypes from 'prop-types';
import * as feather from 'react-icons/fi';
import * as ionicons from 'react-icons/io5';

const strokes = {
	light: '0.1%',
	medium: '1%',
	bold: '2%',
	black: '3%',
};

const sizes = {
	small: 16,
	medium: 32,
	large: 48,
	massive: 64,
};

const colors = { light: '#ffffff', dark: '#001c36' };
const providers = { feather, ionicons };

const Icon = (props) => {
	const { name, color, stroke, size, className } = props;
	const providerProp = name.split('-')[0];
	const IconComponent = providers[providerProp][name.split('-')[1]];

	return (
		<IconComponent
			stroke={strokes[stroke] || stroke}
			color={colors[color] || color}
			size={sizes[size] || size}
			className={className}
		/>
	);
};

Icon.propTypes = {
	name: PropTypes.string.isRequired,
	color: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf(['light', 'dark'])]),
	stroke: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.oneOf(['light', 'medium', 'bold', 'black']),
	]),
	size: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.oneOf(['tiny', 'small', 'medium', 'large']),
	]),
	className: PropTypes.string,
};

Icon.defaultProps = {
	color: 'dark',
	stroke: 'medium',
	size: 'medium',
	className: '',
};

export default Icon;
