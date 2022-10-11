import { useState } from 'react';
import Rating from 'react-rating';
import classnames from 'classnames';
import seedrandom from 'seedrandom';
import { Icon, Tag } from 'components';
import { convertDateTime } from 'services/helpers';
import DataSlider from 'containers/DataSlider';
import dataMappings from 'assets/json/dataTableMappings.json';
import styles from 'containers/DataResult.module.scss';

const colorOptions = ['green', 'blue', 'yellow', 'purple'];

const DataResult = ({ store }) => {
    const [selectedTab, setSelectedTab] = useState(0);
    const randomColor = colorOptions[Math.floor(Math.random() * 4)];

    const renderTabContent = () => {
        if (selectedTab === 0)
            return Object.keys(store.products).length > 0 ? (
                renderProductRows()
            ) : (
                <h3 className={styles.noData}>No Product Data Available</h3>
            );
        else if (selectedTab === 1)
            return store.line !== null ? renderLinesContent() : <h3 className={styles.noData}>No Lines Data Available</h3>;
        return store.reviews.length > 0 ? renderReviewsContent() : <h3 className={styles.noData}>No Reviews Available</h3>;
    };

    const renderLinesContent = () => (
        <table className={styles.linesTable}>
            <thead>
                <tr className={styles.headerRow}>
                    <th className={styles.headerText} style={{ width: '125px' }}>
                        LINE LENGTH
                    </th>
                    <th className={styles.headerText}>WAIT TIME</th>
                    <th className={styles.headerText}>LINE SPEED</th>
                    <th className={styles.headerText}>LAST UPDATED</th>
                </tr>
            </thead>
            <tbody>
                <td>
                    <div className={styles.tagCell}>
                        <Tag
                            color={dataMappings[store.line.length][1]}
                            background={dataMappings.backgrounds[dataMappings[store.line.length][1]]}
                        >
                            {dataMappings[store.line.length][0]}
                        </Tag>
                    </div>
                </td>
                <td>
                    <div className={styles.tagCell}>
                        <Tag
                            color={dataMappings[store.line.wait_time][1]}
                            background={dataMappings.backgrounds[dataMappings[store.line.wait_time][1]]}
                        >
                            {dataMappings[store.line.length][0]}
                        </Tag>
                    </div>
                </td>
                <td>
                    <div className={styles.tagCell}>
                        <Tag
                            color={dataMappings[store.line.speed][1]}
                            background={dataMappings.backgrounds[dataMappings[store.line.speed][1]]}
                        >
                            {dataMappings[store.line.speed][0]}
                        </Tag>
                    </div>
                </td>
                <td className={styles.textCell}>{convertDateTime(store.line.last_updated.$date)}</td>
            </tbody>
        </table>
    );

    const renderReviewsContent = () => (
        <div className={styles.reviewsContainer}>
            {store.reviews.map((review) => (
                <div className={styles.reviewContainer} key={Math.random()}>
                    <div className={styles.reviewTopContent}>
                        <div className={styles.personIconWrapper}>
                            <Icon name='IoPersonCircleSharp' size={30} />
                        </div>
                        <div className={styles.reviewTextContent}>
                            <h3 className={styles.reviewUsername}>Anonymous User</h3>
                            <p className={styles.reviewDateTime}>{convertDateTime(review.created_at.$date)}</p>
                        </div>
                    </div>
                    <div className={styles.ratingsWrapper}>
                        <div className={styles.reviewRatingTag}>
                            <h4 className={styles.reviewRatingTagText}>Overall </h4>
                            <Rating
                                initialRating={review.overall}
                                weight='20'
                                fractions={10}
                                readonly
                                emptySymbol={<Icon name='IoStarOutline' color='yellow' size={12} />}
                                fullSymbol={<Icon name='IoStar' color='yellow' size={12} />}
                                className={styles.ratingStars}
                            />
                        </div>
                        <div className={styles.reviewRatingTag}>
                            <h4 className={styles.reviewRatingTagText}>Cleanliness </h4>
                            <Rating
                                initialRating={3.4}
                                weight='20'
                                fractions={10}
                                readonly
                                emptySymbol={<Icon name='IoStarOutline' color='yellow' size={12} />}
                                fullSymbol={<Icon name='IoStar' color='yellow' size={12} />}
                                className={styles.ratingStars}
                            />
                        </div>
                        <div className={styles.reviewRatingTag}>
                            <h4 className={styles.reviewRatingTagText}>Customer service </h4>
                            <Rating
                                initialRating={3.4}
                                weight='20'
                                fractions={10}
                                readonly
                                emptySymbol={<Icon name='IoStarOutline' color='yellow' size={12} />}
                                fullSymbol={<Icon name='IoStar' color='yellow' size={12} />}
                                className={styles.ratingStars}
                            />
                        </div>
                    </div>
                    <p className={styles.reviewComments}>{review.comments}</p>
                </div>
            ))}
        </div>
    );

    const renderProductRows = () => (
        <div className={styles.dataTableContainer}>
            <table className={styles.dataTable}>
                <thead>
                    <tr className={styles.headerRow}>
                        <th className={styles.headerText}>ID #</th>
                        <th className={styles.headerText}>PRODUCT NAME</th>
                        <th className={styles.headerText}>STOCK STATUS</th>
                        <th className={styles.headerText}>PRODUCT DEMAND</th>
                        <th className={styles.headerText}>LAST UPDATED</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.values(store.products).map((product) => {
                        const productID = parseInt(Math.abs(seedrandom(product.name).int32()).toString().slice(0, 4));
                        return (
                            <tr key={product.name} style={{ height: '35px' }}>
                                <td className={styles.textCell}>{productID}</td>
                                <td className={styles.textCell}>
                                    {product.name.charAt(0).toUpperCase() + product.name.slice(1)}
                                </td>
                                <td>
                                    <div className={styles.tagCell}>
                                        <Tag
                                            color={dataMappings[product.stock][1]}
                                            background={dataMappings.backgrounds[dataMappings[product.stock][1]]}
                                        >
                                            {dataMappings[product.stock][0]}
                                        </Tag>
                                    </div>
                                </td>
                                <td>
                                    <div className={styles.tagCell}>
                                        <Tag
                                            color={dataMappings[product.demand][1]}
                                            background={dataMappings.backgrounds[dataMappings[product.demand][1]]}
                                        >
                                            {dataMappings[product.demand][0]}
                                        </Tag>
                                    </div>
                                </td>
                                <td className={styles.textCell}>{convertDateTime(product.last_updated.$date)}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );

    return (
        <div key={Math.random()} className={classnames(styles.resultContainer, selectedTab === 2 && styles.reviewTabOpen)}>
            <div className={styles.topContentWrapper}>
                <div className={styles.leftContentWrapper}>
                    <div className={styles.storeIconWrapper} style={{ backgroundColor: `var(--color-${randomColor}-600)` }}>
                        <Icon name='IoStorefront' size='large' className={styles.storeIcon} />
                    </div>
                    <div className={styles.storeDetailsWrapper}>
                        <h3 className={styles.storeName}>{store.name}</h3>
                        <p className={styles.storeAddress}>{store.address}</p>
                        <div className={styles.tagsWrapper}>
                            <Tag color='purple' icon='IoTime' background='rgba(130, 107, 249, 0.15)'>
                                Last updated 3:46 PM
                            </Tag>
                            <div className={styles.ratingTagWrapper}>
                                <Rating
                                    initialRating={store.rating}
                                    weight='20'
                                    fractions={10}
                                    readonly
                                    emptySymbol={<Icon name='IoStarOutline' color='yellow' size={12} />}
                                    fullSymbol={<Icon name='IoStar' color='yellow' size={12} />}
                                    className={styles.ratingStars}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <DataSlider className={styles.dataSlider} store={store} onActiveOptionChange={(index) => setSelectedTab(index)} />
            {renderTabContent()}
        </div>
    );
};

export default DataResult;
