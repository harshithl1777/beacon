import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useState } from 'react';
import { Icon } from 'components';
import styles from 'components/Dropdown.module.scss';

const Dropdown = (props) => {
    const { placeholder, options, optionDescriptions, width, className, onOptionSelect } = props;
    const [dropdownActive, setDropdownActive] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedDescription, setSelectedDescription] = useState(null);

    const handleOptionSelect = (option, index) => {
        setSelectedOption(option);
        if (optionDescriptions) setSelectedDescription(optionDescriptions[index]);
        onOptionSelect(option);
    };

    const getOptionsList = () => {
        return (
            <div className={styles.dropdownOptionsContainer} tabIndex='0'>
                {options.map((option, index) => (
                    <div
                        className={classnames(styles.dropdownOption, selectedOption === option && styles.selected)}
                        onClick={() => handleOptionSelect(option, index)}
                        key={option}
                    >
                        <div className={styles.dropdownOptionTextContainer}>
                            <h3
                                className={optionDescriptions ? styles.dropdownOptionHeader : styles.dropdownOptionText}
                            >
                                {option}
                            </h3>
                            {optionDescriptions && (
                                <p className={styles.dropdownOptionDescription}>{optionDescriptions[index]}</p>
                            )}
                        </div>
                        {selectedOption === option && (
                            <Icon
                                name='IoCheckmark'
                                size={20}
                                color='var(--color-green-600)'
                                className={styles.dropdownSelectedIcon}
                            />
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
            <button
                className={classnames(
                    styles.dropdownButtonContainer,
                    optionDescriptions && selectedDescription && styles.dropdownExpandedButtonContainer,
                    className
                )}
                onClick={() => setDropdownActive(true)}
            >
                <div className={styles.dropdownPlaceholderContainer}>
                    <h3 className={styles.dropdownTextPlaceholder}>{selectedOption || placeholder}</h3>
                    {selectedOption && optionDescriptions && (
                        <p className={styles.dropdownTextPlaceholderDescription}>{selectedDescription}</p>
                    )}
                </div>
                <Icon
                    name='IoChevronDown'
                    color='var(--color-gray-600)'
                    size={22}
                    className={styles.dropdownChevronIcon}
                />
            </button>
            {dropdownActive && getOptionsList()}
        </div>
    );
};

Dropdown.propTypes = {
    placeholder: PropTypes.string,
    options: PropTypes.array,
    optionDescriptions: PropTypes.array,
    width: PropTypes.number,
    onOptionSelect: PropTypes.func,
};

Dropdown.defaultProps = {
    placeholder: '',
    options: [],
    forcedOption: '',
    forcedDescription: '',
    width: 155,
    onOptionSelect: () => {},
};

export default Dropdown;
