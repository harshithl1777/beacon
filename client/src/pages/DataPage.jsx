import { useEffect, useState } from 'react';
import { SearchContainer } from 'containers';
import { storesAPI } from 'services/api';
import styles from 'pages/DataPage.module.scss';

const SearchPage = () => {
    const [addressState, setAddressState] = useState(null);
    const [filters, setFilters] = useState({});

    const getNearestStores = async () => {
        const queryParams = { coordinates: addressState.coordinates, ...filters };
        const response = await storesAPI.get('', {}, { data: btoa(JSON.stringify(queryParams)) });
        console.log(response);
    };

    return (
        <div className={styles.dataPageContainer}>
            <div className={styles.headerTextContainer}>
                <h3 className={styles.headerText}>
                    Find <span className={styles.headerColorText}>all the data</span> you need to make <br /> decisions
                    on <span className={styles.headerColorText}>where to shop</span>
                </h3>
                <p className={styles.headerDescriptionText}>
                    To start, just start typing your address or hit the location button to give us a starting search
                    point. Then, select any products you’re looking for and hit search!
                </p>
            </div>
            <SearchContainer
                onAddressChange={(addressState) => setAddressState(addressState)}
                onFiltersChange={(filters) => setFilters(filters)}
            />
            <button onClick={getNearestStores}>Search stories</button>
        </div>
    );
};

export default SearchPage;
