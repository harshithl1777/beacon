import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import LoginPage from 'pages/LoginPage';
import 'react-toastify/dist/ReactToastify.css';
import 'app/global.scss';

const App = () => {
	return (
		<>
			<Router basename='/auth'>
				<Switch>
					<Route exact path='/signup'>
						Signup
					</Route>
					<Route exact path='/login' component={LoginPage} />
					<Route path='*'>404</Route>
				</Switch>
			</Router>
			<Router basename='/app'>
				<Switch>
					<Route exact path='/home'></Route>
				</Switch>
			</Router>
			<ToastContainer />
		</>
	);
};

export default App;
