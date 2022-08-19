import { MultiSelectDropdown, Icon, Dropdown } from 'components';
import styles from 'pages/DataPage.module.scss';

const SearchPage = () => {
    return (
        <div className={styles.dataPageContainer}>
            <div className={styles.headerTextContainer}>
                <h3 className={styles.headerText}>
                    Find <span className={styles.headerColorText}>all the data</span> you need to make <br /> decisions on{' '}
                    <span className={styles.headerColorText}>where to shop</span>
                </h3>
                <p className={styles.headerDescriptionText}>
                    To start, just start typing your address or hit the location button to give us a starting search point. Then, select any
                    products you’re looking for and hit search!
                </p>
            </div>
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
            </div>
        </div>
    );
};

export default SearchPage;
