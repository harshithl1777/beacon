export { default as authAPI } from 'services/api/routers/auth';

const defaultImportError = () => {
	console.error(
		'API imported as default instead of using destructuring. Import with this import { X } from ...'
	);
};

export default defaultImportError;
