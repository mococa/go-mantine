/* -------------- External -------------- */
import { useEffect } from 'react';

/* -------------- Hooks -------------- */
import { useResetContexts } from '_hooks/resetContexts';

/* -------------- Utils -------------- */
import { getStorageTokens } from '_utils/helpers/auth/getStorageTokens';

export function useCheckUserIsLoggedIn(): void {
  /* -------------- Hooks -------------- */
  const { handleLogout } = useResetContexts();

  /* -------------- Effects -------------- */
  useEffect(() => {
    const { access_token, id_token, refresh_token } = getStorageTokens();

    if (!access_token || !id_token || !refresh_token) {
      handleLogout({ redirect: true });
    }
  }, [handleLogout]);
}
