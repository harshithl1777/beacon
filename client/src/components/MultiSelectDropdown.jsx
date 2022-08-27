import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useState } from 'react';
import { Icon, Checkbox } from 'components';
import styles from 'components/MultiSelectDropdown.module.scss';

const MultiSelectDropdown = (props) => {
    const { placeholder, options, width, className, onOptionsChange } = props;
    const [dropdownActive, setDropdownActive] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleSelect = (option) => {
        if (!selectedOptions.includes(option)) {
            setSelectedOptions([...selectedOptions, option]);
        } else {
            const newSelectedOptions = selectedOptions.filter((selectedOption) => selectedOption !== option);
            setSelectedOptions(newSelectedOptions);
        }
        onOptionsChange(selectedOptions);
    };

    const getOptionsList = () => {
        return (
            <div className={styles.dropdownOptionsContainer} tabIndex='0'>
                {options.map((option) => (
                    <div
                        className={classnames(styles.dropdownOption, selectedOptions.includes(option) && styles.selected)}
                        onClick={() => handleSelect(option)}
                        key={option}
                    >
                        <Checkbox key={selectedOptions.includes(option)} forcedStatus={selectedOptions.includes(option)} />
                        <h3 className={styles.dropdownOptionText}>{option}</h3>
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

    const getDropdownLabel = () => {
        const length = selectedOptions.length;
        if (length) {
            if (length > 1) return length + ' items selected';
            return length + ' item selected';
        }
        return null;
    };

    return (
        <div className={classnames(styles.dropdownContainer, className)} style={{ width }} onBlur={handleBlur}>
            <button className={classnames(styles.dropdownButtonContainer, className)} onClick={() => setDropdownActive(true)}>
                <h3 className={styles.dropdownTextPlaceholder}>{getDropdownLabel() || placeholder}</h3>
                <Icon name='IoChevronDown' color='var(--color-gray-600)' size={22} className={styles.dropdownChevronIcon} />
            </button>
            {dropdownActive && getOptionsList()}
        </div>
    );
};

MultiSelectDropdown.propTypes = {
    placeholder: PropTypes.string,
    options: PropTypes.array,
    width: PropTypes.number,
    onOptionsChange: PropTypes.func,
};

MultiSelectDropdown.defaultProps = {
    placeholder: '',
    options: [],
    width: 155,
    onOptionsChange: () => {},
};

export default MultiSelectDropdown;
