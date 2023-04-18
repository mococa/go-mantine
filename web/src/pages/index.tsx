/* ---------- External ---------- */
import React from 'react';
import { GetServerSidePropsContext } from 'next';
import cookie from 'cookie';

/* ---------- Contexts ---------- */
import { useAuth } from '_contexts/auth';

/* ---------- Modules ---------- */
import { SignIn } from '_modules/authentication/pages/sign-in';
import { Dashboard } from '_modules/dashboard/pages';

/* ---------- Interfaces ---------- */
interface Props {
  id_token?: string;
}

export default function HomePage({ id_token }: Props) {
  const { user } = useAuth({ id_token });

  if (user.sub || Boolean(id_token)) return <Dashboard />;

  return <SignIn />;
}

export const getServerSideProps = async ({
  req,
}: GetServerSidePropsContext): Promise<{ props: Props }> => {
  // Preventing logic re-running after client is already mounted
  if (typeof window !== 'undefined') return { props: {} };

  const { id_token } = cookie.parse(req.headers.cookie || '');

  return {
    props: {
      id_token: id_token || '',
    },
  };
};
