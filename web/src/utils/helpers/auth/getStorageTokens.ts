const getToken = (name: string) =>
  localStorage.getItem(`@%name%:${name}`) ||
  sessionStorage.getItem(`@%name%:${name}`) ||
  '';

export const getStorageTokens = () => ({
  access_token: getToken('access_token'),
  id_token: getToken('id_token'),
  refresh_token: getToken('refresh_token'),
  persist: Boolean(localStorage.getItem('@%name%:refresh_token')),
});
