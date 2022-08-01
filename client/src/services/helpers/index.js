export { default as showToast } from "services/helpers/showToast";
export { default as checkTokenExpiry } from "services/helpers/checkTokenExpiry";

const defaultImportError = () => {
  console.error(
    "Hook imported as default instead of using destructuring. Import with this import { X } from ..."
  );
};

export default defaultImportError;
