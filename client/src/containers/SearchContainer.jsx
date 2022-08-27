import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { MultiSelectDropdown, Icon, Dropdown, Button, Tooltip } from 'components';
import { radarAPI, showToast } from 'services/helpers';
import styles from 'containers/SearchContainer.module.scss';

const SearchContainer = () => {
    const [addressState, setAddressState] = useState({ address: '', coordinates: null, changedBy: null });
    const [autocompleteOptions, setAutocompleteOptions] = useState([]);
    const [autocompleteDropdownOpen, setAutocompleteDropdownOpen] = useState(false);

    useEffect(() => {
        if (addressState.address === '' && autocompleteDropdownOpen) setAutocompleteDropdownOpen(false);

        const getAutocompleteResults = async () => {
            const { results, success } = await radarAPI.autocomplete(addressState.address);
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

    const getGeolocation = () => {
        const toastID = showToast.loading('Retrieving your location', '', { autoClose: false });
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (coords) => decodeGeolocation(coords, toastID),
                () => showToast.error('Unable to find location')
            );
        } else {
            showToast.error('Location access denied');
        }
    };

    const decodeGeolocation = async ({ coords, toastID }) => {
        const { result, success } = await radarAPI.reverseGeocode(coords);
        if (success)
            setAddressState({
                address: (result.placeLabel !== undefined ? `${result.placeLabel}, ` : '') + result.formattedAddress,
                coordinates: { latitude: coords.latitude, longitude: coords.longitude },
                changedBy: 'LOCATION_REQUEST',
            });
        toast.dismiss(toastID);
    };

    const handleAutocompleteOptionSelect = (option) => {
        setAutocompleteDropdownOpen(false);
        setAddressState({
            address: (option.placeLabel !== undefined ? `${option.placeLabel}, ` : '') + option.formattedAddress,
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

    return (
        <div className={styles.searchContainer}>
            <div className={styles.searchResultsWrapper}>
                <div className={styles.searchBarWrapper}>
                    <Icon className={styles.searchIcon} name='IoSearch' color='var(--color-gray-600)' />
                    <input
                        className={styles.searchBar}
                        style={{
                            borderBottomRightRadius: autocompleteDropdownOpen ? '0px' : '15px',
                            borderBottomLeftRadius: autocompleteDropdownOpen ? '0px' : '15px',
                        }}
                        value={addressState.address}
                        onChange={(event) =>
                            setAddressState({ ...addressState, address: event.target.value, changedBy: 'USER_INPUT' })
                        }
                        placeholder='Enter an address or point of interest...'
                    />
                    <div className={styles.locationIcon} onClick={getGeolocation}>
                        <Tooltip message='Find your location'>
                            <Icon size={30} name='IoLocationSharp' color='var(--color-gray-400)' />
                        </Tooltip>
                    </div>
                    <Button wrapperClass={styles.searchButtonWrapper}>Search</Button>
                </div>
                {addressState.address &&
                    autocompleteOptions.length !== 0 &&
                    autocompleteDropdownOpen &&
                    renderAutocompleteOptions()}
            </div>
            <div className={styles.dropdownsContainer}>
                <MultiSelectDropdown
                    options={['Oranges', 'Apples', 'Milk', 'Chicken']}
                    width={258}
                    placeholder='Required Food'
                />
                <Dropdown
                    width={225}
                    options={[
                        'Less than 3 km',
                        '3 to 5 km',
                        '5 to 10 km',
                        '10 to 20 km',
                        '20 to 50 km',
                        'Any distance',
                    ]}
                    placeholder='Distance'
                />
                <Dropdown
                    width={210}
                    options={[
                        'No wait time',
                        '5 to 10 mins',
                        '10 to 20 mins',
                        '20 to 40 mins',
                        '40 mins to 1 hour',
                        'Over 1 hour',
                    ]}
                    placeholder='Wait times'
                />
                <Dropdown
                    width={250}
                    options={['In stock', 'Moderate stock', 'Low stock', 'Any stock level']}
                    placeholder='Minimum stock level'
                />
                <Dropdown
                    width={177}
                    options={['5 stars', '4 stars', '3 stars', '2 stars', '1 star', 'Any rating']}
                    placeholder='Ratings'
                />
            </div>
        </div>
    );
};

export default SearchContainer;
