import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Icon } from 'components';
import styles from 'components/Tag.module.scss';

const Tag = ({ text, children, color, icon, customIcon, background, className }) => {
    const getIconToRender = () => {
        if (icon) return <Icon name={icon} color={color} size={12} />;
        else if (customIcon) return customIcon;
        return <></>;
    };

    return (
        <div className={classnames(styles.tagContainer, className)} style={{ backgroundColor: background }}>
            {getIconToRender()}
            <h4
                className={styles.tagText}
                style={{ color: color === 'white' ? 'var(--color-white)' : `var(--color-${color}-600)` }}
            >
                {(text || children).toUpperCase()}
            </h4>
        </div>
    );
};

Tag.propTypes = {
    text: PropTypes.string,
    children: PropTypes.string,
    color: PropTypes.oneOf(['white', 'green', 'blue', 'purple', 'red', 'yellow']),
    icon: PropTypes.string,
    customIcon: PropTypes.element,
    background: PropTypes.string,
    className: PropTypes.string,
};

Tag.defaultProps = {
    text: '',
    children: '',
    color: 'green',
    background: 'rgba(50, 211, 202, 0.15)',
    className: '',
};

export default Tag;
