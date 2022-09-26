import { useState, useRef } from 'react';
import { DataResult, SearchContainer } from 'containers';
import { storesAPI } from 'services/api';
import { showToast } from 'services/helpers';
import sampleStore from 'assets/json/sampleStore.json';
import noResultsImage from 'assets/images/noResults.svg';
import styles from 'pages/DataPage.module.scss';

const SearchPage = () => {
    const [addressState, setAddressState] = useState(null);
    const [filters, setFilters] = useState({});
    const [results, setResults] = useState(null);
    const searchRef = useRef(null);

    const searchButtonClicked = async () => {
        if (true) {
            const queryParams = { coordinates: addressState.coordinates, ...filters };
            const { payload } = await storesAPI.get('', {}, { data: btoa(JSON.stringify(queryParams)) });
            setResults(payload);
            setTimeout(() => {
                searchRef.current.scrollIntoView({ behavior: 'smooth' });
            }, 10);
        } else {
            showToast.error(
                'Not enough credits',
                'You need at least 2 credits for a search. Try contributing to get some more.'
            );
        }
    };

    const renderSearchResults = () => {
        if (results.length > 0) return results.map((store) => <DataResult store={store} />);
        return (
            <div className={styles.noResultsContainer}>
                <img className={styles.noResultsImage} src={noResultsImage} alt='no results' />
                <h3 className={styles.noResultsHeader}>No results found</h3>
                <p className={styles.noResultsSubtitle}>
                    Hmm... it looks like no stores match that search. Try changing up the filters or{' '}
                    <a className={styles.contributeLink} href='/app/contribute'>
                        contribute
                    </a>{' '}
                    to add a store into our database.
                </p>
            </div>
        );
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
                onSearchClick={searchButtonClicked}
                searchRef={searchRef}
            />
            {results === null ? null : <div className={styles.resultsWrapper}>{renderSearchResults()}</div>}
        </div>
    );
};

export default SearchPage;
