export { default as showToast } from 'services/helpers/showToast';
export { default as checkTokenExpiry } from 'services/helpers/checkTokenExpiry';
export { default as radarAPI } from 'services/helpers/radarAPI';

const defaultImportError = () => {
    console.error('Hook imported as default instead of using destructuring. Import with this import { X } from ...');
};

export default defaultImportError;
