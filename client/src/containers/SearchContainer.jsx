import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { MultiSelectDropdown, Icon, Dropdown, Button, Tooltip } from 'components';
import { radarAPI, showToast } from 'services/helpers';
import optionMappings from 'assets/json/searchOptionMappings.json';
import styles from 'containers/SearchContainer.module.scss';

const SearchContainer = ({ onAddressChange, onFiltersChange, onSearchClick, searchRef }) => {
    const [addressState, setAddressState] = useState({ address: '', coordinates: null, changedBy: null });
    const [autocompleteOptions, setAutocompleteOptions] = useState([]);
    const [autocompleteDropdownOpen, setAutocompleteDropdownOpen] = useState(false);
    const [filters, setFilters] = useState({
        products: [],
        distance: 'ANY_DISTANCE',
        wait_time: 'ANY_WAIT_TIME',
        ratings: 1,
    });

    useEffect(() => {
        if (addressState.address === '' && autocompleteDropdownOpen) setAutocompleteDropdownOpen(false);
        if (addressState.changedBy !== 'USER_INPUT') onAddressChange(addressState);

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

    useEffect(() => onFiltersChange(filters), [filters]);

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
        <div className={styles.searchContainer} ref={searchRef}>
            <div className={styles.dropdownsContainer}>
                <MultiSelectDropdown
                    options={['Oranges', 'Apples', 'Milk', 'Chicken']}
                    width={258}
                    placeholder='Required Food'
                    onOptionsChange={(selectedOptions) => {
                        setFilters({ ...filters, products: selectedOptions });
                    }}
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
                    onOptionSelect={(option) => setFilters({ ...filters, distance: optionMappings[option] })}
                />
                <Dropdown
                    width={210}
                    options={[
                        'No wait time',
                        '5 to 10 minutes',
                        '10 to 20 minutes',
                        '20 to 40 minutes',
                        '40 to 60 minutes',
                        'More than 60 minutes',
                    ]}
                    placeholder='Wait times'
                    onOptionSelect={(option) => setFilters({ ...filters, wait_time: optionMappings[option] })}
                />
                <Dropdown
                    width={177}
                    options={['5 stars', '4 stars', '3 stars', '2 stars', 'Any rating']}
                    placeholder='Ratings'
                    onOptionSelect={(option) => setFilters({ ...filters, ratings: optionMappings[option] })}
                />
            </div>
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
                    <Button
                        disabled={
                            !(
                                addressState.address &&
                                addressState.coordinates &&
                                addressState.changedBy !== 'USER_INPUT'
                            )
                        }
                        onClick={onSearchClick}
                        wrapperClass={styles.searchButtonWrapper}
                    >
                        Search
                    </Button>
                </div>
                {addressState.address &&
                    autocompleteOptions.length !== 0 &&
                    autocompleteDropdownOpen &&
                    renderAutocompleteOptions()}
            </div>
        </div>
    );
};

export default SearchContainer;
