import { useState } from 'react';
import { connect } from 'react-redux';
import { Dropdown, Icon, Button } from 'components';
import { submitProductsData } from 'redux/actions/contributionsActions';
import styles from 'containers/ProductsForm.module.scss';

const ProductsForm = ({ submitProductsData }) => {
    const [productData, setProductData] = useState(Array(3).fill({ name: '', stock: '', demand: '' }));

    const productOptions = [
        'Eggs',
        'Milk',
        'Bread',
        'Bagel',
        'Rice',
        'Onions',
        'Potatoes',
        'Apples',
        'Chicken',
        'Fish',
        'Beef',
        'Pork',
        'Pasta',
        'Soup',
        'Pizza',
        'Noodles',
    ];

    const dropdownValueMappings = {
        'Out of Stock': 'OUT_OF_STOCK',
        Low: 'LOW',
        Moderate: 'MODERATE',
        High: 'HIGH',
    };

    const getAvailableProductOptions = () => {
        const selectedProducts = productData.map((product) => product.name);
        return productOptions.filter((product) => !selectedProducts.includes(product.toLowerCase()));
    };

    const handleOptionSelect = (index, data) => {
        const stateCopy = [...productData];
        stateCopy[index] = data;
        setProductData(stateCopy);
    };

    const addProductClicked = () => {
        const stateCopy = [...productData];
        stateCopy.push({ name: '', stock: '', demand: '' });
        setProductData(stateCopy);
    };

    const checkAllProductsData = () => {
        const incompleteProducts = productData.filter(
            (product) => product.name === '' || product.demand === '' || product.stock === ''
        );
        return incompleteProducts.length > 0;
    };

    const renderDropdownRows = () => {
        return productData.map((row, index) => (
            <div className={styles.dropdownRow} key={index}>
                <Dropdown
                    className={styles.productDropdown}
                    buttonClassName={styles.productDropdownButton}
                    options={getAvailableProductOptions()}
                    placeholder='Product name'
                    onOptionSelect={(option) =>
                        handleOptionSelect(index, { ...productData[index], name: option.toLowerCase() })
                    }
                />
                <Dropdown
                    className={styles.productDropdown}
                    buttonClassName={styles.productDropdownButton}
                    options={['Out of Stock', 'Low', 'Moderate', 'High']}
                    placeholder='Stock level'
                    onOptionSelect={(option) =>
                        handleOptionSelect(index, { ...productData[index], stock: dropdownValueMappings[option] })
                    }
                />
                <Dropdown
                    className={styles.productDropdown}
                    buttonClassName={styles.productDropdownButton}
                    options={['Low', 'Moderate', 'High']}
                    placeholder='Demand level'
                    onOptionSelect={(option) =>
                        handleOptionSelect(index, { ...productData[index], demand: dropdownValueMappings[option] })
                    }
                />
            </div>
        ));
    };

    return (
        <div className={styles.productsFormContainer}>
            <Icon name='CMLogo' size='large' color='dark' className={styles.productsFormLogo} draggable='false' />
            <div className={styles.headerTextContainer}>
                <h3 className={styles.headerText}>Products Data</h3>
                <p className={styles.headerDescriptionText}>
                    Just as promised, contributing takes less than 2 minutes. All you need to do is enter the product
                    data of at least 3 products. Then, click Finish.
                </p>
            </div>
            <div className={styles.dropdownsContainer}>
                <div className={styles.dropdownsHeaderContainer}>
                    <div className={styles.dropdownsHeaderTextContainer}>
                        <label className={styles.dropdownsHeaderLabel}>
                            Enter the data for at least 3 products below
                        </label>
                        <p className={styles.dropdownsDescription}>
                            Add as many products as you like and select the appropriate options.
                        </p>
                    </div>
                    <Button
                        variant='secondary'
                        wrapperClass={styles.addDropdownRowButtonWrapper}
                        className={styles.addDropdownRowButton}
                        onClick={addProductClicked}
                        disabled={productData.length === 16}
                    >
                        Add Product
                    </Button>
                </div>
                {renderDropdownRows()}
            </div>
            <Button
                disabled={checkAllProductsData()}
                className={styles.productsFormSubmitButton}
                wrapperClass={styles.productsFormSubmitButtonWrapper}
                onClick={() => submitProductsData(productData)}
            >
                Finish your contribution
            </Button>
        </div>
    );
};

const mapStateToProps = ({ contributions }) => ({ contributions });

export default connect(mapStateToProps, { submitProductsData })(ProductsForm);
