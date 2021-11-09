export { default as useAuth } from 'services/hooks/useAuth';
export { default as useQuery } from 'services/hooks/useQuery';

const defaultImportError = () => {
	console.error(
		'Hook imported as default instead of using destructuring. Import with this import { X } from ...'
	);
};

export default defaultImportError;
