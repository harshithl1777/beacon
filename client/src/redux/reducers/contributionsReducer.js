import {
    START_CONTRIBUTION,
    SUBMIT_PRODUCTS_DATA,
    SUBMIT_LINE_DATA,
    SUBMIT_REVIEW_DATA,
    SUBMIT_CONTRIBUTION,
} from 'redux/actions/types';

const INITIAL_STATE = {
    target: null,
    address: null,
    storeID: null,
    products: null,
    line: null,
    reviews: null,
};

const contributionsReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case START_CONTRIBUTION:
            const contributionTypeState = scaffoldContributionStateByType(payload.target);
            return {
                target: payload.target,
                address: payload.address,
                storeID: payload.storeID,
                ...contributionTypeState,
            };
        case SUBMIT_PRODUCTS_DATA:
            return {
                ...state,
                products: payload.productData,
            };
        case SUBMIT_LINE_DATA:
            return {
                ...state,
                line: {
                    length: payload.lineLength,
                    speed: payload.lineSpeed,
                    wait_time: payload.lineWaitTime,
                },
            };
        case SUBMIT_REVIEW_DATA:
            return {
                ...state,
                reviews: {
                    overall: payload.ratings.overall,
                    cleanliness: payload.ratings.cleanliness,
                    customer_service: payload.ratings.customerService,
                    comments: payload.comments,
                },
            };
        case SUBMIT_CONTRIBUTION:
            return INITIAL_STATE;
        default:
            return state;
    }
};

const scaffoldContributionStateByType = (target) => {
    if (target === 'PRODUCTS') {
        return {
            products: [],
        };
    } else if (target === 'LINE') {
        return {
            line: {
                length: null,
                speed: null,
                wait_time: null,
            },
        };
    } else {
        return {
            reviews: {
                overall: null,
                cleanliness: null,
                customer_service: null,
                comments: null,
            },
        };
    }
};

export default contributionsReducer;
