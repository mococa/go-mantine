/* -------------- External -------------- */
import { useEffect, useState } from 'react';

/* -------------- Hooks -------------- */
import { useResetContexts } from '_hooks/resetContexts';

/* -------------- Utils -------------- */
import { getStorageTokens } from '_utils/helpers/auth/getStorageTokens';

export function useCheckUserIsLoggedIn(): void {
  /* -------------- States -------------- */
  const [checked, setChecked] = useState<boolean>(false);

  /* -------------- Hooks -------------- */
  const { handleLogout } = useResetContexts();

  /* -------------- Effects -------------- */
  useEffect(() => {
    const { access_token, id_token, refresh_token } = getStorageTokens();

    if ((!access_token || !id_token || !refresh_token) && !checked) {
      handleLogout({ redirect_back: true });
    }

    setChecked(true);
  }, [checked, handleLogout]);
}
