import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { MultiSelectDropdown, Icon, Dropdown, Button, Tooltip } from 'components';
import { radarAPI, showToast } from 'services/helpers';
import styles from 'containers/SearchContainer.module.scss';

const SearchContainer = () => {
    const [addressState, setAddressState] = useState('');
    const [autocompleteOptions, setAutocompleteOptions] = useState([]);

    useEffect(() => {
        const getAutocompleteResults = async () => {
            const { results, success } = await radarAPI.autocomplete(addressState);
            if (success) setAutocompleteOptions(results);
        };

        const timeoutID = setTimeout(() => {
            if (addressState) getAutocompleteResults();
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
        console.log(coords);
        const { result, success } = await radarAPI.reverseGeocode(coords);
        if (success) setAddressState(result.formattedAddress);
        toast.dismiss(toastID);
    };

    return (
        <div className={styles.searchContainer}>
            <div className={styles.searchBarWrapper}>
                <Icon className={styles.searchIcon} name='IoSearch' color='var(--color-gray-600)' />
                <input
                    className={styles.searchBar}
                    value={addressState}
                    onChange={(event) => setAddressState(event.target.value)}
                    placeholder='Enter an address or point of interest...'
                />
                <div className={styles.locationIcon} onClick={getGeolocation}>
                    <Tooltip message='Find your location'>
                        <Icon size={30} name='IoLocationSharp' color='var(--color-gray-400)' />
                    </Tooltip>
                </div>
                <Button wrapperClass={styles.searchButtonWrapper}>Search</Button>
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
                        '20 to 30 mins',
                        '30 mins to 1 hour',
                        'Over 1 hour',
                    ]}
                    placeholder='Wait times'
                />
                <Dropdown
                    width={250}
                    options={[
                        'less than 3 km',
                        '3 to 5 km',
                        '5 to 10 km',
                        '10 to 20 km',
                        '20 to 50 km',
                        'more than  50 km',
                    ]}
                    placeholder='Minimum stock level'
                />
            </div>
        </div>
    );
};

export default SearchContainer;
