export { default as Button } from 'components/Button/Button';
export { default as Icon } from 'components/Icon/Icon';

const defaultImportError = () => {
	console.error('Component imported as default instead of using destructuring. Import with this import { X } from ...');
};

export default defaultImportError;
