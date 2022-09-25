import { useState } from 'react';
import classnames from 'classnames';
import sliderMeasurements from 'assets/json/dataSliderMeasurements.json';
import styles from 'containers/DataSlider.module.scss';

const DataSlider = ({ className }) => {
    const [activeOption, setActiveOption] = useState(0);
    const [hoverOption, setHoverOption] = useState(null);
    const [offsetLeft, setOffsetLeft] = useState(0);
    const [offsetWidth, setOffsetWidth] = useState(72);

    const dataOptionClicked = (optionClicked) => {
        setOffsetLeft(sliderMeasurements.offsetLeft[optionClicked]);
        setOffsetWidth(sliderMeasurements.offsetWidth[optionClicked]);
        setActiveOption(optionClicked);
    };

    return (
        <div className={classnames(styles.dataSliderContainer, className)}>
            <div style={{ left: `${offsetLeft}px`, width: `${offsetWidth}px` }} className={styles.sliderIndicator} />
            <div className={styles.sliderLine} />
            <div className={styles.dataOptionsContainer}>
                <div
                    className={classnames(styles.dataOption, styles.productsOption)}
                    onMouseEnter={() => setHoverOption(0)}
                    onMouseLeave={() => setHoverOption(null)}
                    onClick={(e) => dataOptionClicked(0)}
                >
                    <h3
                        className={
                            activeOption === 0 || hoverOption === 0
                                ? styles.dataOptionTextActive
                                : styles.dataOptionText
                        }
                    >
                        Products
                    </h3>
                </div>
                <div
                    className={styles.dataOption}
                    onMouseEnter={() => setHoverOption(1)}
                    onMouseLeave={() => setHoverOption(null)}
                    onClick={(e) => dataOptionClicked(1)}
                >
                    <h3
                        className={
                            activeOption === 1 || hoverOption === 1
                                ? styles.dataOptionTextActive
                                : styles.dataOptionText
                        }
                    >
                        Lines
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default DataSlider;
