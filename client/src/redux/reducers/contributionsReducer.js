import { START_CONTRIBUTION } from 'redux/actions/types';

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
        default:
            return state;
    }
};

const scaffoldContributionStateByType = (target) => {
    if (target === 'PRODUCTS') {
        return {
            products: {
                name: null,
                stock: null,
                demand: null,
            },
        };
    } else if (target === 'LINE') {
        return {
            line: {
                length: null,
                speed: null,
                waitTime: null,
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
