/* ---------- External ---------- */
import React from 'react';
import { Button, Text } from '@mantine/core';
import Link from 'next/link';

/* ---------- Common Templates ---------- */
import { MainLayout } from '_common/templates/MainLayout';

/* ---------- Hooks ---------- */
import { useCheckUserIsLoggedIn } from '_hooks/checkUserIsLoggedIn';

export const Dashboard = () => {
  useCheckUserIsLoggedIn();

  return (
    <MainLayout>
      <h4>Hello world</h4>

      <Link href="/protected">
        <Button>Go to another protected page</Button>
      </Link>

      <Text h="120vh" py="lg">
        Scroll down
      </Text>

      <Text py="lg">End of page</Text>
    </MainLayout>
  );
};
