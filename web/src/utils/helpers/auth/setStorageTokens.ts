import { Auth } from '_utils/helpers/auth/@types';

export const setStorageTokens = ({
  access_token,
  id_token,
  refresh_token,
  storage_method,
}: Auth.SetStorageTokensInput) => {
  switch (storage_method) {
    case 'local':
      localStorage.setItem('@%name%:access_token', access_token);
      localStorage.setItem('@%name%:id_token', id_token);
      localStorage.setItem('@%name%:keep', 'true');
      if (refresh_token)
        localStorage.setItem('@%name%:refresh_token', refresh_token);
      break;

    case 'session':
      sessionStorage.setItem('@%name%:access_token', access_token);
      sessionStorage.setItem('@%name%:id_token', id_token);
      if (refresh_token)
        sessionStorage.setItem('@%name%:refresh_token', refresh_token);
      break;

    default:
      break;
  }
};
