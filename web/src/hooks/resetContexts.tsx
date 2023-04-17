/* ---------- External ---------- */
import { useCallback, useMemo, useRef } from 'react';
import { useRouter } from 'next/router';

/* ---------- Contexts ---------- */
import { useAuth } from '_contexts/auth';
import { useCommon } from '_contexts/common';

/* ---------- Services ---------- */
import { services } from '_services';

/* ---------- Helpers ---------- */
import { clearStorageTokens } from '_utils/helpers/auth/clearStorageTokens';

/* ---------- Interfaces ---------- */
interface LogoutProps {
  redirect_back?: boolean;
}

export const useResetContexts = () => {
  /* ---------- Refs ---------- */
  const logging_out = useRef<boolean>(false);

  /* ---------- Hooks ---------- */
  const { push, replace, asPath } = useRouter();
  const { handleResetAuth } = useAuth();
  const { handleResetCommon } = useCommon();

  /* ---------- Callbacks ---------- */
  const handleLogout = useCallback(
    async ({ redirect_back }: LogoutProps) => {
      // Preventing multiple API calls
      if (logging_out.current) return;
      logging_out.current = true;

      // Remove cookies
      await services.auth.sign_out();

      // Reset all contexts values
      handleResetAuth();
      handleResetCommon();

      // Clear local/session storage
      clearStorageTokens({ storage_method: 'local' });
      clearStorageTokens({ storage_method: 'session' });

      await push('/');

      logging_out.current = false;

      if (!redirect_back) return;

      const current_path = asPath.replace(/^\/+/, '');

      // Goes back to login page, if is currently not, redirecting pre-done
      replace(
        `/${
          current_path ? `?redirect=${encodeURIComponent(current_path)}` : ''
        }`,
      );
    },
    [handleResetAuth, handleResetCommon, push, asPath, replace],
  );

  return useMemo(() => ({ handleLogout }), [handleLogout]);
};
