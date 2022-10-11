import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

import { Protected, Gateway } from 'components';
import { NavigationBar, LineForm, ProductsForm, ReviewForm } from 'containers';
import {
    SignupPage,
    LoginPage,
    DataPage,
    BeginContributionPage,
    SubmitContributionPage,
    LandingPage,
    Error404Page,
} from 'pages';
import 'react-toastify/dist/ReactToastify.css';
import 'app/global.scss';

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
                <Route exact path='/' element={<LandingPage />} />
                <Route
                    path='/app/data'
                    element={
                        <Protected>
                            <NavigationBar />
                            <DataPage />
                        </Protected>
                    }
                />
                <Route path='/' element={<ContributionLayout />}>
                    <Route
                        path='/app/contribute'
                        element={
                            <Protected>
                                <BeginContributionPage />
                            </Protected>
                        }
                    />
                    <Route
                        path='/app/contribute/lines'
                        element={
                            <Protected>
                                <LineForm />
                            </Protected>
                        }
                    />
                    <Route
                        path='/app/contribute/products'
                        element={
                            <Protected>
                                <ProductsForm />
                            </Protected>
                        }
                    />
                    <Route
                        path='/app/contribute/reviews'
                        element={
                            <Protected>
                                <ReviewForm />
                            </Protected>
                        }
                    />
                    <Route
                        path='/app/contribute/submit'
                        element={
                            <Protected>
                                <SubmitContributionPage />
                            </Protected>
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
                <Route path='*' element={<Error404Page />} />
            </Routes>
        </Router>
        <ToastContainer />
    </>
);

export default App;
