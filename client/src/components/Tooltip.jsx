import { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from 'components/Tooltip.module.scss';

const Tooltip = (props) => {
	let timeout;
	const { children, message, position, delay, showArrow } = props;
	const [active, setActive] = useState(false);
	const [transition, setTransition] = useState(null);

	const showTip = () => {
		setTransition('tooltipShow');
		timeout = setTimeout(() => {
			setActive(true);
		}, delay || 600);
	};

	const hideTip = () => {
		clearInterval(timeout);
		setTransition('tooltipHide');
		setTimeout(() => setActive(false), 100);
	};

	return message ? (
		<div className={styles.tooltipWrapper} onMouseEnter={showTip} onMouseLeave={hideTip}>
			{children}
			{active && (
				<div
					className={classnames(
						styles.tooltipContent,
						showArrow && styles.showTooltipArrow,
						styles[transition],
						styles[position]
					)}
				>
					{message}
				</div>
			)}
		</div>
	) : (
		children
	);
};

Tooltip.propTypes = {
	message: PropTypes.string.isRequired,
	position: PropTypes.oneOf(['top', 'right', 'left', 'bottom']),
	showArrow: PropTypes.bool,
};

Tooltip.defaultProps = {
	position: 'bottom',
	showArrow: false,
};

export default Tooltip;
