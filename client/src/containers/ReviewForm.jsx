import { useState } from 'react';
import { connect } from 'react-redux';
import { Dropdown, Icon, Button } from 'components';
import { submitReviewData } from 'redux/actions/contributionsActions';
import styles from 'containers/ReviewForm.module.scss';

const ReviewForm = ({ contributions, submitReviewData }) => {
    const [ratings, setRatings] = useState({ overall: null, cleanliness: null, customerService: null });
    const [comments, setComments] = useState('');

    console.log(ratings, comments);

    const ratingsOptions = ['5 stars', '4 stars', '3 stars', '2 stars', '1 star'];

    return (
        <div className={styles.reviewFormContainer}>
            <Icon name='CMLogo' size='large' color='dark' className={styles.reviewFormLogo} draggable='false' />
            <div className={styles.headerTextContainer}>
                <h3 className={styles.headerText}>Store Review</h3>
                <p className={styles.headerDescriptionText}>
                    Just as promised, contributing takes less than 2 minutes. All you need to do is rate the store on
                    the following areas. Then, add some comments if you like and click Finish.
                </p>
            </div>
            <div className={styles.dropdownsContainer}>
                <label className={styles.reviewRatingsDropdownLabel}>
                    What would you rate this store for the following areas?
                </label>
                <div className={styles.dropdownRow}>
                    <Dropdown
                        className={styles.rowDropdown}
                        buttonClassName={styles.rowDropdownButton}
                        placeholder='Cleanliness'
                        options={ratingsOptions}
                        onOptionSelect={(option) =>
                            setRatings({ ...ratings, cleanliness: parseInt(option.split(' ')[0]) })
                        }
                    />
                    <Dropdown
                        className={styles.rowDropdown}
                        buttonClassName={styles.rowDropdownButton}
                        placeholder='Customer Service'
                        options={ratingsOptions}
                        onOptionSelect={(option) =>
                            setRatings({ ...ratings, customerService: parseInt(option.split(' ')[0]) })
                        }
                    />
                    <Dropdown
                        className={styles.rowDropdown}
                        buttonClassName={styles.rowDropdownButton}
                        placeholder='Overall Rating'
                        options={ratingsOptions}
                        onOptionSelect={(option) => setRatings({ ...ratings, overall: parseInt(option.split(' ')[0]) })}
                    />
                </div>
            </div>
            <div className={styles.commentsContainer}>
                <label className={styles.commentsLabel}>Any other comments?</label>
                <textarea
                    className={styles.commentsInput}
                    placeholder='Type your comments here...'
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                />
            </div>
            <Button
                disabled={!(ratings.cleanliness && ratings.customerService && ratings.overall)}
                className={styles.reviewFormSubmitButton}
                wrapperClass={styles.reviewFormSubmitButtonWrapper}
                onClick={() => {
                    submitReviewData(ratings, comments);
                }}
            >
                Finish your contribution
            </Button>
        </div>
    );
};

const mapStateToProps = ({ contributions }) => ({ contributions });

export default connect(mapStateToProps, { submitReviewData })(ReviewForm);
