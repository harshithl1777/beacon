export { default as SignupPage } from 'pages/SignupPage';
export { default as LoginPage } from 'pages/LoginPage';
export { default as DataPage } from 'pages/DataPage';
export { default as BeginContributionPage } from 'pages/BeginContributionPage';
export { default as SubmitContributionPage } from 'pages/SubmitContributionPage';
export { default as LandingPage } from 'pages/LandingPage';
export { default as Error404Page } from 'pages/Error404Page';

const defaultImportError = () => {
    console.error(
        'Component imported as default instead of using destructuring. Import with this import { X } from ...'
    );
};

export default defaultImportError;
