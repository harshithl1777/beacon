export { default as Button } from 'components/Button';
export { default as Input } from 'components/Input';
export { default as Icon } from 'components/Icon';
export { default as Spinner } from 'components/Spinner';
export { default as Tooltip } from 'components/Tooltip';

const defaultImportError = () => {
	console.error(
		'Component imported as default instead of using destructuring. Import with this import { X } from ...'
	);
};

export default defaultImportError;
