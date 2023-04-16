import { Sx } from '@mantine/core';

export const NavbarSx: Sx = ({ colorScheme, colors }) => ({
  ...(colorScheme === 'light' && {
    background: colors.gray[0],
  }),

  zIndex: 1,
});

export const MenuItemSx: Sx = ({ colorScheme, colors }) => ({
  ...(colorScheme === 'light' && {
    color: colors.gray[8],
  }),
});
