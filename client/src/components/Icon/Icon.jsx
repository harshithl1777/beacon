import PropTypes from 'prop-types';
import * as ionicons from 'react-icons/io5';

const strokes = {
	light: '0.1%',
	medium: '1%',
	bold: '2%',
	black: '3%',
};

const sizes = {
	small: 20,
	medium: 28,
	large: 38,
	massive: 50,
};

const colors = { light: '#ffffff', dark: '#001c36' };

const Icon = (props) => {
	const { name, color, stroke, size, className } = props;
	const IconComponent = ionicons[name];

	return (
		<IconComponent
			strokeWidth={name.includes('outline') ? strokes[stroke] || stroke : ''} // use stroke if icon is outline
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
		PropTypes.oneOf(['small', 'medium', 'large', 'massive']),
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
