import { combineReducers } from 'redux';
import authReducer from 'redux/reducers/authReducer';
import errorReducer from 'redux/reducers/errorsReducer';
import contributionsReducer from 'redux/reducers/contributionsReducer';

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    contributions: contributionsReducer,
});
