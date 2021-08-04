export { default as Button } from 'components/Button/Button';

export default () => {
	console.error(
		'Component imported as default instead of using destructuring. Import with this import { X } from ...'
	);
};
