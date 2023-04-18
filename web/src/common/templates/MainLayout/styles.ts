import { Sx } from '@mantine/core';

export const MainSx: Sx = theme => ({
  display: 'flex',

  height: '100vh',
  maxWidth: 1920,

  overflow: 'hidden',

  margin: '0 auto',

  background: theme.colorScheme === 'light' ? theme.colors.gray[0] : undefined,
});

export const SidebarSx: Sx = ({ fn }) => ({
  width: 260,

  zIndex: 0,

  height: 'calc(100vh - 63px)',

  transition: '200ms ease',

  '&[aria-expanded="false"]': {
    width: 80,
  },

  [fn.smallerThan(500)]: {
    position: 'fixed',

    width: '70%',
    left: '-100%',

    '&[aria-expanded="true"]': {
      left: 0,
    },
  },
});

export const MainContentSx: Sx = ({ fn }) => ({
  overflow: 'auto',

  height: 'calc(100vh - 63px)',

  flex: 1,

  padding: 12,
  [fn.largerThan(500)]: {
    padding: 32,
  },
});

export const ExpandSx: Sx = () => ({
  flex: 1,
});
