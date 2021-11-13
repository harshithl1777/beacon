import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ProtectedRoute, GatewayRoute } from 'components';

import LoginPage from 'pages/LoginPage';
import 'react-toastify/dist/ReactToastify.css';
import 'app/global.scss';

const App = () => {
	return (
		<>
			<Router>
				<Switch>
					<GatewayRoute exact path='/auth/login' component={LoginPage} />
					<GatewayRoute exact path='/auth/signup'>
						Signup
					</GatewayRoute>
					<ProtectedRoute exact path='/app/home'>
						Home
					</ProtectedRoute>
					<Route path='*'>404</Route>
				</Switch>
			</Router>
			<ToastContainer />
		</>
	);
};

export default App;
