export { default as LoginForm } from 'containers/LoginForm';
export { default as SignupForm } from 'containers/SignupForm';
export { default as NavigationBar } from 'containers/NavigationBar';
export { default as SearchContainer } from 'containers/SearchContainer';
export { default as LineForm } from 'containers/LineForm';
export { default as ProductsForm } from 'containers/ProductsForm';
export { default as ReviewForm } from 'containers/ReviewForm';
export { default as DataSlider } from 'containers/DataSlider';
export { default as DataResult } from 'containers/DataResult';

const defaultImportError = () => {
    console.error(
        'Component imported as default instead of using destructuring. Import with this import { X } from ...'
    );
};

export default defaultImportError;
