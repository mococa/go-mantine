/* ---------- External ---------- */
import React from 'react';

/* ---------- Contexts ---------- */
import { useAuth } from '_contexts/auth';

/* ---------- Modules ---------- */
import { SignIn } from '_modules/authentication/pages/sign-in';
import { Dashboard } from '_modules/dashboard/pages';

export default function HomePage() {
  /* ---------- Hooks ---------- */
  const { user } = useAuth();

  if (user.sub) return <Dashboard />;

  return <SignIn />;
}
