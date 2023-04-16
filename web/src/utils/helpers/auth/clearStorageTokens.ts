/* ---------- Types ---------- */
import { Auth } from '_utils/helpers/auth/@types';

export const clearStorageTokens = ({
  storage_method,
}: Auth.ClearStorageTokensInput) => {
  switch (storage_method) {
    case 'local':
      localStorage.removeItem('@%name%:access_token');
      localStorage.removeItem('@%name%:id_token');
      localStorage.removeItem('@%name%:keep');
      localStorage.removeItem('@%name%:refresh_token');
      break;

    case 'session':
      sessionStorage.removeItem('@%name%:access_token');
      sessionStorage.removeItem('@%name%:id_token');
      sessionStorage.removeItem('@%name%:refresh_token');
      break;

    default:
      break;
  }
};
