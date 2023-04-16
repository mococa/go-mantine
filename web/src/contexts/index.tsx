/* ---------- Providers ---------- */
import { AuthProvider } from '_contexts/auth';

export const AppProvider = ({ children }: React.PropsWithChildren) => (
  <AuthProvider>{children}</AuthProvider>
);
