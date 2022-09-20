import {
    START_CONTRIBUTION,
    SUBMIT_PRODUCTS_DATA,
    SUBMIT_LINE_DATA,
    SUBMIT_REVIEW_DATA,
    SUBMIT_CONTRIBUTION,
} from 'redux/actions/types';
import { storesAPI } from 'services/api';
import { showToast } from 'services/helpers';
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
    return true;
};

export const submitLineData = (lineData) => (dispatch) => {
    dispatch({
        type: SUBMIT_LINE_DATA,
        payload: {
            ...lineData,
        },
    });
    return true;
};

export const submitReviewData = (ratings, comments) => (dispatch) => {
    dispatch({
        type: SUBMIT_REVIEW_DATA,
        payload: {
            ratings,
            comments,
        },
    });
    return true;
};

export const submitContribution = (contributions) => async (dispatch) => {
    const storeExists = await storesAPI.get(contributions.storeID);
    let confirmationTypeSuccess = true;
    if (storeExists.success) {
        const { success } = storesAPI.patch(contributions.storeID, contributions);
        confirmationTypeSuccess = success;
    } else {
        const { success } = storesAPI.post(contributions);
        confirmationTypeSuccess = success;
    }
    if (confirmationTypeSuccess)
        showToast.success('Your contribution was successful!', 'Thank you for supporting the community behind Beacon.');
    else showToast.error('Something went wrong', 'Your contribution was not successful. Try again later.');
    dispatch({ type: SUBMIT_CONTRIBUTION });
    return true;
};
