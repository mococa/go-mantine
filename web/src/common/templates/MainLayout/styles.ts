import { Sx } from '@mantine/core';

export const MainSx: Sx = theme => ({
  display: 'flex',

  height: '100vh',
  maxWidth: 1920,

  margin: '0 auto',

  background: theme.colorScheme === 'light' ? theme.colors.gray[0] : undefined,
});
