import { Sx } from '@mantine/core';

export const LogoBoxSx: Sx = ({ colorScheme }) => ({
  display: 'flex',

  '& a': {
    display: 'flex',
  },

  '& svg': {
    height: 'auto',
    width: 'auto',

    'path.cls-2': {
      fill: colorScheme === 'light' ? '#1c2b33' : 'white',
    },
  },
});
