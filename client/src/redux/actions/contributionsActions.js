import { START_CONTRIBUTION, SUBMIT_PRODUCTS_DATA, SUBMIT_LINE_DATA, SUBMIT_REVIEW_DATA } from 'redux/actions/types';
import { useStoreID } from 'services/hooks';

export const startContributionForm = (target, address, coordinates) => (dispatch) => {
    const storeID = useStoreID(coordinates);
    const payload = {
        target,
        address,
        storeID,
    };
    dispatch({ type: START_CONTRIBUTION, payload });
};

export const submitProductsData = (productData) => (dispatch) => {
    dispatch({
        type: SUBMIT_PRODUCTS_DATA,
        payload: {
            productData,
        },
    });
};

export const submitLineData = (lineData) => (dispatch) => {
    dispatch({
        type: SUBMIT_LINE_DATA,
        payload: {
            ...lineData,
        },
    });
};

export const submitReviewData = (ratings, comments) => (dispatch) => {
    console.log(ratings, comments);
    dispatch({
        type: SUBMIT_REVIEW_DATA,
        payload: {
            ratings,
            comments,
        },
    });
};
