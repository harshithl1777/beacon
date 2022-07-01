import ReactDOM from 'react-dom';
import { initializeApp } from 'firebase/app';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import App from 'app/App';
import rootReducer from 'redux/reducers';

// Firebase Auth initialization
const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
	authDomain: 'beacon-web1.firebaseapp.com',
	projectId: 'beacon-web1',
	appId: process.env.REACT_APP_FIREBASE_APPID,
};

initializeApp(firebaseConfig);

const store = createStore(rootReducer, applyMiddleware(thunk));

// Redux store initialization and app rendering
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.querySelector('#root')
);

export default store;
