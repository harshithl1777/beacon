export { default as useQuery } from 'services/hooks/useQuery';
export { default as useScript } from 'services/hooks/useScript';

const defaultImportError = () => {
    console.error('Hook imported as default instead of using destructuring. Import with this import { X } from ...');
};

export default defaultImportError;
