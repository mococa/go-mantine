/* ---------- External ---------- */
import React from 'react';

/* ---------- Common Templates ---------- */
import { MainLayout } from '_common/templates/MainLayout';

export default function Protected() {
  return (
    <MainLayout>
      <h1>Hi, I&apos;m a protected page</h1>
    </MainLayout>
  );
}
