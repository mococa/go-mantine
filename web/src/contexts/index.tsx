/* ---------- External ---------- */
import React from 'react';

/* ---------- Providers ---------- */
import { AuthProvider } from '_contexts/auth';
import { CommonProvider } from '_contexts/common';

interface Props extends React.PropsWithChildren {
  id_token: string;
}

export const AppProvider = ({ children, id_token }: Props) => (
  <CommonProvider>
    <AuthProvider default_id_token={id_token}>{children}</AuthProvider>
  </CommonProvider>
);
