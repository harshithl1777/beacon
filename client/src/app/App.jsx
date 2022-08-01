import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { Protected, Gateway } from 'components';
import { NavigationBar } from 'containers';
import { SignupPage, LoginPage, HomePage } from 'pages';
import 'react-toastify/dist/ReactToastify.css';
import 'app/global.scss';

const App = () => (
	<>
		<Router>
			<Routes>
				<Route path='/' element={<Navigate to='/app/home' />} />
				<Route
					path='/auth/signup'
					element={
						<Gateway>
							<SignupPage />
						</Gateway>
					}
				/>
				<Route
					path='/auth/login'
					element={
						<Gateway>
							<LoginPage />
						</Gateway>
					}
				/>
				<Route
					path='/app/home'
					element={
						<Protected>
							<NavigationBar />
							<HomePage />
						</Protected>
					}
				/>
			</Routes>
		</Router>
		<ToastContainer />
	</>
);

export default App;
