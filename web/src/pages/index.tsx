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
  /* ---------- Hooks ---------- */
  const { user } = useAuth();

  /* ---------- Constants ---------- */
  const logged_in = user.sub || Boolean(id_token);

  if (logged_in) return <Dashboard />;

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
