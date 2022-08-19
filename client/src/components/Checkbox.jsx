import { useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Icon } from 'components';
import styles from 'components/Checkbox.module.scss';

const Checkbox = (props) => {
    const { label, variant, forcedStatus, onSelect, onDeselect, wrapperClass, className } = props;
    const [status, setStatus] = useState(forcedStatus);

    const handleClick = () => {
        if (status) {
            setStatus(false);
            onDeselect();
        } else {
            setStatus(true);
            onSelect();
        }
    };

    return (
        <button className={classnames(styles.checkboxButtonContainer, wrapperClass)} onClick={handleClick}>
            <div className={classnames(styles.checkboxIconContainer, styles[variant], status && styles.selected, className)}>
                <Icon name='CMCheckbox' size='medium' color='light' className={styles.checkboxIcon}></Icon>
            </div>
            {label && <label className={styles.checkboxLabel}>{label}</label>}
        </button>
    );
};

Checkbox.propTypes = {
    label: PropTypes.string,
    forcedStatus: PropTypes.bool,
    variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'blue', 'purple', 'yellow']),
    onSelect: PropTypes.func,
    onDeselect: PropTypes.func,
};

Checkbox.defaultProps = {
    label: '',
    variant: 'primary',
    status: false,
    onSelect: () => {},
    onDeselect: () => {},
};

export default Checkbox;
