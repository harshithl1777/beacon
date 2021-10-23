export { default as Button } from 'components/Button';
export { default as Icon } from 'components/Icon';
export { default as Spinner } from 'components/Spinner';

const defaultImportError = () => {
	console.error(
		'Component imported as default instead of using destructuring. Import with this import { X } from ...'
	);
};

export default defaultImportError;
