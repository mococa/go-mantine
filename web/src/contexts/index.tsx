/* ---------- External ---------- */
import React from 'react';

/* ---------- Providers ---------- */
import { AuthProvider } from '_contexts/auth';
import { CommonProvider } from '_contexts/common';

/* ---------- Interfaces ---------- */
interface ServerSideProps {
  id_token: string;
}

/* ---------- Types ---------- */
type Props = React.PropsWithChildren & ServerSideProps;

export const AppProvider = ({ children, id_token }: Props) => {
  return (
    <CommonProvider>
      <AuthProvider id_token={id_token}>{children}</AuthProvider>
    </CommonProvider>
  );
};
