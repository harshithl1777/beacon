export { default as SignupPage } from 'pages/SignupPage';
export { default as LoginPage } from 'pages/LoginPage';
export { default as DataPage } from 'pages/DataPage';

const defaultImportError = () => {
    console.error('Component imported as default instead of using destructuring. Import with this import { X } from ...');
};

export default defaultImportError;
