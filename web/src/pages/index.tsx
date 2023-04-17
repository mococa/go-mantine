/* ---------- External ---------- */
import React from 'react';
import { GetServerSidePropsContext } from 'next';
import cookie from 'cookie';

/* ---------- Contexts ---------- */
import { useAuth } from '_contexts/auth';

/* ---------- Modules ---------- */
import { SignIn } from '_modules/authentication/pages/sign-in';
import { Dashboard } from '_modules/dashboard/pages';

export default function HomePage({ logged_in }: { logged_in?: boolean }) {
  const { user } = useAuth();

  if (user.sub || logged_in) return <Dashboard />;

  return <SignIn />;
}

export const getServerSideProps = async ({
  req,
  res,
}: GetServerSidePropsContext) => {
  // Preventing logic re-running after client is already mounted
  if (typeof window !== 'undefined') return { props: {} };

  const { id_token } = cookie.parse(req.headers.cookie || '');

  res.setHeader('Cache-Control', 's-maxage=5, stale-while-revalidate');

  return {
    props: {
      logged_in: Boolean(id_token),
    },
  };
};
