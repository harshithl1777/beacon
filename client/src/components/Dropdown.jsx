import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useState } from 'react';
import { Icon } from 'components';
import styles from 'components/Dropdown.module.scss';

const Dropdown = (props) => {
    const { placeholder, options, width, className } = props;
    const [selectedOption, setSelectedOption] = useState(null);

    return (
        <>
            <button className={classnames(styles.dropdownButtonContainer, className)} style={{ width }}>
                <h3 className={styles.dropdownTextPlaceholder}>{placeholder}</h3>
                <Icon name='IoChevronDown' color='var(--color-gray-600)' size={22} className={styles.dropdownChevronIcon} />
            </button>
        </>
    );
};

Dropdown.propTypes = {
    placeholder: PropTypes.string,
    options: PropTypes.object,
    width: PropTypes.number,
};

Dropdown.defaultProps = {
    placeholder: '',
    options: {},
    width: 155,
};

export default Dropdown;
