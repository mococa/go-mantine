/* ---------- External ---------- */
import { useCallback } from 'react';
import { useRouter } from 'next/router';

/* ---------- Contexts ---------- */
import { useAuth } from '_contexts/auth';

/* ---------- Services ---------- */
import { services } from '_services';

/* ---------- Helpers ---------- */
import { clearStorageTokens } from '_utils/helpers/auth/clearStorageTokens';

interface LogoutProps {
  redirect?: boolean;
}

export const useResetContexts = () => {
  /* ---------- Hooks ---------- */
  const { replace, asPath } = useRouter();
  const { handleResetAuth } = useAuth();

  /* ---------- Callbacks ---------- */
  const handleLogout = useCallback(
    async ({ redirect }: LogoutProps) => {
      // Remove cookies
      await services.auth.sign_out().catch(() => 0);

      // Reset all contexts values
      handleResetAuth();

      // Clear local/session storage
      clearStorageTokens({ storage_method: 'local' });
      clearStorageTokens({ storage_method: 'session' });

      if (!redirect) return;

      const current_path = asPath.replace(/^\/+/, '');

      // Goes back to login page, if is currently not,
      // setting up redirection if needed
      replace(
        `/${
          current_path ? `?redirect=${encodeURIComponent(current_path)}` : ''
        }`,
      );
    },
    [handleResetAuth, replace],
  );

  return { handleLogout };
};
