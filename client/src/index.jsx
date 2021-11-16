import ReactDOM from 'react-dom';
import { initializeApp } from 'firebase/app';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import App from 'app/App';
import rootReducer from 'redux/reducers';

// Firebase Auth initialization
const firebaseConfig = {
	apiKey: 'AIzaSyCibwssaCnkku0ww8YiOU6TqcR6CaY39KE',
	authDomain: 'beacon-web1.firebaseapp.com',
	projectId: 'beacon-web1',
	appId: '1:843923290407:web:115b651f5579b0b0619102',
};

initializeApp(firebaseConfig);

// Redux store initialization and app rendering
ReactDOM.render(
	<Provider store={createStore(rootReducer, applyMiddleware(thunk))}>
		<App />
	</Provider>,
	document.querySelector('#root')
);
