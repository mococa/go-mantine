import { Sx, rem } from '@mantine/core';

export const SidebarButtonSx: Sx = theme => ({
  fontWeight: 500,
  display: 'block',
  width: '100%',
  minWidth: 185,
  padding: `${theme.spacing.xs} 0`,
  color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
  fontSize: theme.fontSizes.sm,

  '&:hover': {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
  },
});

export const SidebarLinkSx: Sx = theme => ({
  fontWeight: 500,
  display: 'block',
  textDecoration: 'none',
  padding: `${theme.spacing.xs} ${theme.spacing.md}`,
  paddingLeft: rem(31),
  marginLeft: rem(30),
  fontSize: theme.fontSizes.sm,
  color:
    theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
  borderLeft: `${rem(1)} solid ${
    theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
  }`,

  '&:hover': {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
  },
});

export const SidebarChevronStyles = {
  transition: 'transform 200ms ease',
};
