import { initializeApp } from 'firebase/app';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
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

const enhancers = compose(
    applyMiddleware(thunk),
    process.env.REACT_APP_ENV === 'DEVELOPMENT' &&
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
);

const store = createStore(rootReducer, enhancers);

// Redux store initialization and app rendering
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);

export default store;
