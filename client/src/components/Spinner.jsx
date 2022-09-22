import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from 'components/Spinner.module.scss';

const sizes = {
    small: 20,
    medium: 28,
    large: 38,
    massive: 50,
};

const Spinner = ({ color, size, className, circleClassName }) => {
    return (
        <div className={classnames(styles[`size-${sizes[size]}`], className)}>
            <div className={classnames(styles[color], styles.circle, circleClassName)} />
        </div>
    );
};

Spinner.propTypes = {
    color: PropTypes.oneOf(['light', 'dark', 'green']),
    size: PropTypes.oneOf(['small', 'medium', 'large', 'massive']),
    className: PropTypes.string,
    circleClassName: PropTypes.string,
};

Spinner.defaultProps = {
    color: 'dark',
    size: 'medium',
    className: '',
    circleClassName: '',
};

export default Spinner;
