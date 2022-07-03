import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Protected, Gateway } from 'components';
import { NavigationBar } from 'containers';
import { SignupPage, LoginPage, HomePage } from 'pages';
import 'react-toastify/dist/ReactToastify.css';
import 'app/global.scss';

const App = () => {
	return (
		<>
			<Router>
				<Routes>
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
								<HomePage />
							</Protected>
						}
					/>
					<Route path='*' element={<NavigationBar />} />
				</Routes>
			</Router>
			<ToastContainer />
		</>
	);
};

export default App;
