export { default as authAPI } from "services/api/routers/auth";
export { default as usersAPI } from "services/api/routers/users";

const defaultImportError = () => {
  console.error(
    "API imported as default instead of using destructuring. Import with this import { X } from ..."
  );
};

export default defaultImportError;
