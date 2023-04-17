/* ---------- External ---------- */
import React from 'react';

/* ---------- Common Templates ---------- */
import { MainLayout } from '_common/templates/MainLayout';

/* ---------- Hooks ---------- */
import { useCheckUserIsLoggedIn } from '_hooks/checkUserIsLoggedIn';

export default function Protected() {
  useCheckUserIsLoggedIn();

  return (
    <MainLayout>
      <h1>Hi, I&apos;m a protected page</h1>
    </MainLayout>
  );
}
