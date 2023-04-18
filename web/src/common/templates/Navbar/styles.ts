import { Sx } from '@mantine/core';

export const NavbarSx: Sx = ({ colorScheme, colors, fn, spacing }) => ({
  ...(colorScheme === 'light' && {
    background: colors.gray[0],
  }),

  borderTop: 'none !important',
  borderInline: 'none !important',
  borderRadius: 0,

  display: 'flex',
  flexFlow: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',

  padding: '16px 32px 8px 16px',

  zIndex: 1,

  gap: spacing.lg,

  [fn.smallerThan(500)]: {
    padding: '16px 12px 8px 12px',

    gap: spacing.xs,
  },
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

export const LogoWrapperSx: Sx = ({ fn, spacing }) => ({
  gap: spacing.sm,

  [fn.smallerThan(500)]: {
    gap: 4,

    '& a > svg': {
      width: 72,
    },
  },
});

export const MobileInvisibleSx: Sx = ({ fn }) => ({
  [fn.smallerThan(500)]: {
    display: 'none',
  },
});

export const SearchboxWrapperSx: Sx = ({ fn }) => ({
  flex: 1,
  justifyContent: 'center',

  '& > button': {
    borderRadius: '50%',

    padding: '0 8px',

    width: 38,
    height: 38,
  },

  [fn.largerThan(500)]: {
    '& > button': {
      display: 'none',
    },
  },

  [fn.smallerThan(500)]: {
    justifyContent: 'flex-end',
  },
});

export const SearchboxSx: Sx = ({ fn }) => ({
  padding: '4px 12px',

  flex: 1,

  maxWidth: 413,
  width: '100%',

  cursor: 'pointer',

  alignSelf: 'center',

  [fn.smallerThan(500)]: {
    backgroundColor: 'transparent !important',

    padding: '0',

    border: 'none !important',

    display: 'flex',
    justifyContent: 'flex-end',
  },
});
