import { MultiSelectDropdown, Icon, Dropdown } from 'components';
import styles from 'containers/SearchContainer.module.scss';

const SearchContainer = () => {
    return (
        <div className={styles.searchContainer}>
            <div className={styles.searchBarWrapper}>
                <Icon className={styles.searchIcon} name='IoSearch' color='var(--color-gray-600)' />
                <input className={styles.searchBar} placeholder='Enter an address or point of interest...' />
            </div>
            <div className={styles.dropdownsContainer}>
                <MultiSelectDropdown options={['Oranges', 'Apples', 'Milk', 'Chicken']} width={258} placeholder='Required Food' />
                <Dropdown
                    width={225}
                    options={['Less than 3 km', '3 to 5 km', '5 to 10 km', '10 to 20 km', '20 to 50 km', 'Any distance']}
                    placeholder='Distance'
                />
                <Dropdown
                    width={210}
                    options={['No wait time', '5 to 10 mins', '10 to 20 mins', '20 to 30 mins', '30 mins to 1 hour', 'Over 1 hour']}
                    placeholder='Wait times'
                />
                <Dropdown
                    width={250}
                    options={['less than 3 km', '3 to 5 km', '5 to 10 km', '10 to 20 km', '20 to 50 km', 'more than  50 km']}
                    placeholder='Minimum stock level'
                />
            </div>
            <div id='geocoder'></div>
            <pre id='result'></pre>
        </div>
    );
};

export default SearchContainer;
