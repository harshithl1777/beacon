export { default as useQuery } from 'services/hooks/useQuery';
export { default as useStoreID } from 'services/hooks/useStoreID';

const defaultImportError = () => {
    console.error('Hook imported as default instead of using destructuring. Import with this import { X } from ...');
};

export default defaultImportError;
