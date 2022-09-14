import { START_CONTRIBUTION } from 'redux/actions/types';
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
