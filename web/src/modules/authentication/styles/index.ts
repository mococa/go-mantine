import { Sx } from '@mantine/core';

export const AuthPageSx: Sx = ({ fn }) => ({
  width: '100%',

  [fn.smallerThan(500)]: {
    flexFlow: 'column',
  },
});

export const PaperContainerSx: Sx = ({ fn }) => ({
  minHeight: '100vh',

  padding: '0 56px 0',

  flex: 1,
  display: 'flex',
  placeContent: 'center',

  [fn.smallerThan(500)]: {
    padding: '96px 12px 0',
  },
});

export const FormContainerBoxSx: Sx = ({ fn }) => ({
  maxWidth: 460,
  width: '100%',

  margin: 'auto 0',

  [fn.largerThan(1920)]: {
    maxWidth: 500,
  },

  [fn.smallerThan(500)]: {
    margin: 0,
  },
});

export const FormTitleSx: Sx = ({ fn, spacing, headings }) => ({
  marginTop: spacing.sm,
  marginBottom: 4,

  fontSize: headings.sizes.h3.fontSize,
  lineHeight: headings.sizes.h3.lineHeight,

  [fn.largerThan(1920)]: {
    fontSize: headings.sizes.h2.fontSize,
    lineHeight: headings.sizes.h2.lineHeight,
  },
});
