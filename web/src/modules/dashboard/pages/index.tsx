import { Button } from '@mantine/core';
import { MainLayout } from '_common/templates/MainLayout';

export const Dashboard = () => (
  <MainLayout>
    <h4>Hello world</h4>

    <Button component="a" href="/protected">
      Go to another protected page
    </Button>
  </MainLayout>
);
