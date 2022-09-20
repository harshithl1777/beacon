import { useState } from 'react';
import { connect } from 'react-redux';
import { Dropdown, Icon, Button } from 'components';
import { submitLineData } from 'redux/actions/contributionsActions';
import styles from 'containers/LineForm.module.scss';

const LineForm = ({ contributions, submitLineData }) => {
    const [lineLength, setLineLength] = useState(null);
    const [lineSpeed, setLineSpeed] = useState(null);
    const [lineWaitTime, setLineWaitTime] = useState(null);

    const dropdownValueMappings = {
        'No line was present': 'NO_LINE',
        'Less than 15 people': 'LESS_THAN_15',
        '15 to 30 people': '15_TO_30',
        '30 to 50 people': '30_TO_50',
        'More than 50 people': 'MORE_THAN_50',
        Slow: 'SLOW',
        Moderate: 'MODERATE',
        Fast: 'FAST',
        'I did not have to wait': 'NO_WAIT',
        '5 to 10 minutes': '5_TO_10',
        '10 to 20 minutes': '10_TO_20',
        '20 to 40 minutes': '20_TO_40',
        '40 to 60 minutes': '40_TO_60',
        'More than 60 minutes': 'MORE_THAN_60',
    };

    return (
        <div className={styles.lineFormContainer}>
            <Icon name='CMLogo' size='large' color='dark' className={styles.lineFormLogo} draggable='false' />
            <div className={styles.headerTextContainer}>
                <h3 className={styles.headerText}>Lines Data</h3>
                <p className={styles.headerDescriptionText}>
                    Just as promised, contributing takes less than 2 minutes. All you need to do is read the questions
                    below and select what you observed. Then, click Finish.
                </p>
            </div>
            <div className={styles.dropdownsContainer}>
                <label className={styles.lineLengthDropdownLabel}>
                    How many people were in line to enter the store?
                </label>
                <Dropdown
                    className={styles.lineLengthDropdown}
                    placeholder='Select a line length'
                    options={[
                        'No line was present',
                        'Less than 15 people',
                        '15 to 30 people',
                        '30 to 50 people',
                        'More than 50 people',
                    ]}
                    onOptionSelect={(option) => setLineLength(dropdownValueMappings[option])}
                />
                <div className={styles.bottomDropdownsContainer}>
                    <div className={styles.lineSpeedDropdownContainer}>
                        <label className={styles.lineSpeedDropdownLabel}>How fast was the line moving?</label>
                        <Dropdown
                            className={styles.lineSpeedDropdown}
                            placeholder='Select a line speed'
                            options={['Slow', 'Moderate', 'Fast']}
                            onOptionSelect={(option) => setLineSpeed(dropdownValueMappings[option])}
                        />
                    </div>
                    <div className={styles.lineWaitTimeDropdownContainer}>
                        <label className={styles.lineWaitTimeDropdownLabel}>How long did you spend in the line?</label>
                        <Dropdown
                            className={styles.lineWaitTimeDropdown}
                            placeholder='Select a time span'
                            options={[
                                'I did not have to wait',
                                '5 to 10 minutes',
                                '10 to 20 minutes',
                                '20 to 40 minutes',
                                '40 to 60 minutes',
                                'More than 60 minutes',
                            ]}
                            onOptionSelect={(option) => setLineWaitTime(dropdownValueMappings[option])}
                        />
                    </div>
                </div>
            </div>
            <Button
                disabled={!(lineLength && lineSpeed && lineWaitTime)}
                className={styles.lineFormSubmitButton}
                wrapperClass={styles.lineFormSubmitButtonWrapper}
                onClick={() => {
                    submitLineData({ lineLength, lineSpeed, lineWaitTime });
                }}
            >
                Finish your contribution
            </Button>
        </div>
    );
};

const mapStateToProps = ({ contributions }) => ({ contributions });

export default connect(mapStateToProps, { submitLineData })(LineForm);
