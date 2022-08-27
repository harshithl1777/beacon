import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';

import { Protected, Gateway } from 'components';
import { NavigationBar } from 'containers';
import { SignupPage, LoginPage, DataPage } from 'pages';
import 'react-toastify/dist/ReactToastify.css';
import 'app/global.scss';

const InteriorLayout = () => (
    <>
        <NavigationBar />
        <Outlet />
    </>
);

const App = () => (
    <>
        <Router>
            <Routes>
                <Route path='/' element={<InteriorLayout />}>
                    <Route index element={<Navigate to='/app/data' />} />
                    <Route
                        path='/app/data'
                        element={
                            // <Protected>
                            // 	<NavigationBar />
                            // </Protected>
                            <DataPage />
                        }
                    />
                </Route>
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
                <Route path='*' element={<div>404</div>} />
            </Routes>
        </Router>
        <ToastContainer />
    </>
);

export default App;
