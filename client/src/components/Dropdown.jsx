import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useState } from 'react';
import { Icon } from 'components';
import styles from 'components/Dropdown.module.scss';

const Dropdown = (props) => {
    const { placeholder, options, width, className } = props;
    const [dropdownActive, setDropdownActive] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    console.log('🚀 ~ file: Dropdown.jsx ~ line 10 ~ Dropdown ~ dropdownActive', dropdownActive);
    console.log('🚀 ~ file: Dropdown.jsx ~ line 11 ~ Dropdown ~ selectedOption', selectedOption);

    const getOptionsList = () => {
        return (
            <div className={styles.dropdownOptionsContainer} tabIndex='0'>
                {options.map((option) => (
                    <div
                        className={classnames(styles.dropdownOption, selectedOption === option && styles.selected)}
                        onClick={() => setSelectedOption(option)}
                        key={option}
                    >
                        <h3 className={styles.dropdownOptionText}>{option}</h3>
                        {selectedOption === option && (
                            <Icon name='IoCheckmark' size={20} color='var(--color-green-600)' className={styles.dropdownSelectedIcon} />
                        )}
                    </div>
                ))}
            </div>
        );
    };

    const handleBlur = (event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
            setDropdownActive(false);
        }
    };

    return (
        <div className={classnames(styles.dropdownContainer, className)} style={{ width }} onBlur={handleBlur}>
            <button className={classnames(styles.dropdownButtonContainer, className)} onClick={() => setDropdownActive(true)}>
                <h3 className={styles.dropdownTextPlaceholder}>{selectedOption || placeholder}</h3>
                <Icon name='IoChevronDown' color='var(--color-gray-600)' size={22} className={styles.dropdownChevronIcon} />
            </button>
            {dropdownActive && getOptionsList()}
        </div>
    );
};

Dropdown.propTypes = {
    placeholder: PropTypes.string,
    options: PropTypes.array,
    width: PropTypes.number,
};

Dropdown.defaultProps = {
    placeholder: '',
    options: {},
    width: 155,
};

export default Dropdown;
