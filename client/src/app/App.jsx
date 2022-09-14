import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';

import { Protected, Gateway } from 'components';
import { NavigationBar, LineForm } from 'containers';
import { SignupPage, LoginPage, DataPage, BeginContributionPage } from 'pages';
import 'react-toastify/dist/ReactToastify.css';
import 'app/global.scss';

const InteriorLayout = () => (
    <>
        <NavigationBar />
        <Outlet />
    </>
);

const ContributionLayout = () => (
    <>
        <div className='topLine' />
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
                <Route path='/' element={<ContributionLayout />}>
                    <Route path='/app/contribute' element={<BeginContributionPage />} />
                    <Route path='/app/contribute/lines' element={<LineForm />} />
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
