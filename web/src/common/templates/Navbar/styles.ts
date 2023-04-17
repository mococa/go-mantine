import { Sx } from '@mantine/core';

export const NavbarSx: Sx = ({ colorScheme, colors }) => ({
  ...(colorScheme === 'light' && {
    background: colors.gray[0],
  }),

  borderTop: 'none !important',
  borderInline: 'none !important',
  borderRadius: 0,

  zIndex: 1,
});

export const MenuItemSx: Sx = ({ colorScheme, colors }) => ({
  ...(colorScheme === 'light' && {
    color: colors.gray[8],
  }),
});

export const KbdContainerSx: Sx = ({ fn }) => ({
  marginBottom: 2,
  marginLeft: 'auto',

  [fn.smallerThan(700)]: {
    display: 'none',
  },
});

export const NotificationsButtonSx: Sx = ({ fn }) => ({
  borderRadius: '50%',

  padding: 4,

  width: 36,

  [fn.smallerThan(500)]: {
    display: 'none',
  },
});

export const LogoWrapperSx: Sx = ({ fn }) => ({
  [fn.smallerThan(500)]: {
    '& > div': {
      display: 'none',
    },
  },
});
