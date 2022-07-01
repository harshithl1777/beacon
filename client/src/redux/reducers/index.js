import { combineReducers } from 'redux';
import authReducer from 'redux/reducers/authReducer';
import errorReducer from 'redux/reducers/errorsReducer';

export default combineReducers({
	auth: authReducer,
	errors: errorReducer,
});
