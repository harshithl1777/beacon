import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Button, Checkbox, Dropdown, Icon } from 'components';
import { radarAPI } from 'services/helpers';
import { startContributionForm } from 'redux/actions/contributionsActions';
import styles from 'pages/BeginContributionPage.module.scss';

const BeginContributionPage = ({ contributions, startContributionForm }) => {
    const [addressState, setAddressState] = useState({ address: '', coordinates: null, changedBy: null });
    const [autocompleteOptions, setAutocompleteOptions] = useState([]);
    const [autocompleteDropdownOpen, setAutocompleteDropdownOpen] = useState(false);
    const [checkboxChecked, setCheckboxChecked] = useState(false);
    const [contributionType, setContributionType] = useState(null);

    const contributionURLMappings = {
        PRODUCTS: '/app/contribute/products',
        LINE: '/app/contribute/lines',
        REVIEWS: '/app/contribute/reviews',
    };

    useEffect(() => {
        if (addressState.address === '' && autocompleteDropdownOpen) setAutocompleteDropdownOpen(false);

        const getAutocompleteResults = async () => {
            const { results, success } = await radarAPI.autocompletePlaces(addressState.address);
            if (success) setAutocompleteOptions(results);
            setAutocompleteDropdownOpen(true);
        };

        const timeoutID = setTimeout(() => {
            if (addressState.address && addressState.changedBy === 'USER_INPUT') getAutocompleteResults();
        }, 500);

        return () => {
            clearTimeout(timeoutID);
        };
    }, [addressState]);

    const handleAutocompleteOptionSelect = (option) => {
        setAutocompleteDropdownOpen(false);
        setAddressState({
            name: option.placeLabel,
            address: option.formattedAddress,
            coordinates: { latitude: option.latitude, longitude: option.longitude },
            changedBy: 'OPTION_SELECT',
        });
    };

    const renderAutocompleteOptions = () => {
        return (
            <div className={styles.autocompleteDropdownContainer}>
                {autocompleteOptions.map((option) => (
                    <button
                        className={styles.autocompleteOptionButton}
                        onClick={() => handleAutocompleteOptionSelect(option)}
                        key={option.formattedAddress}
                    >
                        <Icon name='CMMapPin' size='medium' color='dark' />
                        <p className={styles.autocompleteOptionText}>
                            {(option.placeLabel !== undefined ? `${option.placeLabel}, ` : '') +
                                option.formattedAddress}
                        </p>
                    </button>
                ))}
            </div>
        );
    };

    const contributionTypeSelected = (option) => {
        switch (option) {
            case 'Product Stock':
                setContributionType('PRODUCTS');
                break;
            case 'Lines':
                setContributionType('LINE');
                break;
            default:
                setContributionType('REVIEWS');
                break;
        }
    };

    return contributions.storeID ? (
        <Navigate to={contributionURLMappings[contributions.target]} />
    ) : (
        <div className={styles.contributionPageContainer}>
            <Icon name='CMLogo' size='large' color='light' className={styles.contributionPageLogo} draggable='false' />
            <div className={styles.headerTextContainer}>
                <h3 className={styles.headerText}>Thanks for contributing! Let’s get you started.</h3>
                <p className={styles.headerDescriptionText}>
                    To start, just type out the name of the store you want to contribute to. Then, select what type of
                    contribution you're looking to make and click start.
                </p>
            </div>
            <div className={styles.searchContainer}>
                <p className={styles.searchBarLabel}>What store did you go to?</p>
                <div className={styles.searchResultsWrapper}>
                    <div className={styles.searchBarWrapper}>
                        <input
                            className={styles.searchBar}
                            style={{
                                borderBottomRightRadius: autocompleteDropdownOpen ? '0px' : '15px',
                                borderBottomLeftRadius: autocompleteDropdownOpen ? '0px' : '15px',
                            }}
                            value={`${addressState.name}, ${addressState.address}`}
                            onChange={(event) =>
                                setAddressState({
                                    ...addressState,
                                    address: event.target.value,
                                    changedBy: 'USER_INPUT',
                                })
                            }
                            placeholder='Start typing the store’s name and address...'
                        />
                    </div>
                    {addressState.address &&
                        autocompleteOptions.length !== 0 &&
                        autocompleteDropdownOpen &&
                        renderAutocompleteOptions()}
                </div>
            </div>
            <div className={styles.contributionTypeContainer}>
                <p className={styles.contributionTypeLabel}>What type of contribution would you like to make?</p>
                <Dropdown
                    width={670}
                    placeholder='Select a contribution type'
                    options={['Product Stock', 'Lines', 'Store Review']}
                    optionDescriptions={[
                        'Tell us about the stock levels in the store',
                        'Provide data about any lines or wait times',
                        'Give your own ratings and a review of the store',
                    ]}
                    onOptionSelect={contributionTypeSelected}
                    className={styles.contributionTypeDropdown}
                />
            </div>
            <div className={styles.contributionCheckboxContainer}>
                <Checkbox
                    className={styles.contributionCheckbox}
                    onSelect={() => setCheckboxChecked(true)}
                    onDeselect={() => setCheckboxChecked(false)}
                />
                <label className={styles.contributionCheckboxLabel}>
                    By filling this form, I allow Beacon to provide this data to other shoppers.
                </label>
            </div>
            <Button
                disabled={!(addressState.coordinates && checkboxChecked && contributionType)}
                className={styles.contributionStartButton}
                wrapperClass={styles.contributionStartButtonWrapper}
                onClick={() =>
                    startContributionForm(
                        contributionType,
                        addressState.name,
                        addressState.address,
                        addressState.coordinates
                    )
                }
            >
                Start your contribution
            </Button>
        </div>
    );
};

const mapStateToProps = ({ contributions }) => ({ contributions });

export default connect(mapStateToProps, { startContributionForm })(BeginContributionPage);
