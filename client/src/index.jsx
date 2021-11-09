import ReactDOM from 'react-dom';
import App from 'app/App';
import { initializeApp } from 'firebase/app';

// Firebase Auth initialization
const firebaseConfig = {
	apiKey: 'AIzaSyCibwssaCnkku0ww8YiOU6TqcR6CaY39KE',
	authDomain: 'beacon-web1.firebaseapp.com',
	projectId: 'beacon-web1',
	appId: '1:843923290407:web:115b651f5579b0b0619102',
};

initializeApp(firebaseConfig);

// App rendering to HTML Document
ReactDOM.render(<App />, document.querySelector('#root'));
