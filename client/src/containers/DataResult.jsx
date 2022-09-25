import { useState } from 'react';
import { Button, Icon, Tag } from 'components';
import DataSlider from 'containers/DataSlider';
import styles from 'containers/DataResult.module.scss';

const colorOptions = ['green', 'blue', 'yellow', 'purple'];

const DataResult = ({ store }) => {
    const randomColor = colorOptions[Math.floor(Math.random() * 4)];

    return (
        <div className={styles.resultContainer}>
            <div className={styles.topContentWrapper}>
                <div className={styles.leftContentWrapper}>
                    <div
                        className={styles.storeIconWrapper}
                        style={{ backgroundColor: `var(--color-${randomColor}-600)` }}
                    >
                        <Icon name='IoStorefront' size='large' className={styles.storeIcon} />
                    </div>
                    <div className={styles.storeDetailsWrapper}>
                        <h3 className={styles.storeName}>{store.name}</h3>
                        <p className={styles.storeAddress}>{store.address.slice(store.address.indexOf(',') + 1)}</p>
                        <div className={styles.tagsWrapper}>
                            <Tag color='yellow' icon='IoTime' background='rgba(248, 109, 31, 0.15)'>
                                Last updated 3:46 PM
                            </Tag>
                            <Tag color='white' icon='IoHeart' background='var(--color-blue-600)'>
                                {`${store.likes} ${store.likes > 0 ? 'likes' : 'like'}`}
                            </Tag>
                        </div>
                    </div>
                </div>
                <Button
                    variant='blue'
                    customIcon={<Icon name='IoHeart' color='white' size='small' />}
                    wrapperClass={styles.likeButtonWrapper}
                    className={styles.likeButton}
                >
                    Like
                </Button>
            </div>
            <DataSlider className={styles.dataSlider} />
            <table className={styles.dataTable}>
                <tr className={styles.headerRow}>
                    <th className={styles.headerText}>ID #</th>
                    <th className={styles.headerText}>PRODUCT NAME</th>
                    <th className={styles.headerText}>STOCK STATUS</th>
                    <th className={styles.headerText}>PRODUCT DEMAND</th>
                    <th className={styles.headerText}>LAST UPDATED</th>
                </tr>
            </table>
        </div>
    );
};

export default DataResult;
