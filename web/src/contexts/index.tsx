/* ---------- External ---------- */
import React from 'react';

/* ---------- Providers ---------- */
import { AuthProvider } from '_contexts/auth';
import { CommonProvider } from '_contexts/common';

export const AppProvider = ({ children }: React.PropsWithChildren) => (
  <CommonProvider>
    <AuthProvider>{children}</AuthProvider>
  </CommonProvider>
);
