export { default as LoginForm } from 'containers/LoginForm';
export { default as SignupForm } from 'containers/SignupForm';
export { default as AuthRedirect } from 'containers/AuthRedirect';

const defaultImportError = () => {
	console.error(
		'Component imported as default instead of using destructuring. Import with this import { X } from ...'
	);
};

export default defaultImportError;
