/* ---------- External ---------- */
import { MantineThemeOverride, DEFAULT_THEME } from '@mantine/core';
import merge from 'lodash.merge';

/* ---------- Constants ---------- */
const screen_sizes = {
  mobile_small: '320px',
  mobile: '480px',
  tablet: '720px',
  desktop_xs: '1024px',
  desktop_sm: '1280px',
  desktop_md: '1360px',
  desktop_1440: '1440px',
  desktop_lg: '1920px',
  desktop_2k: '2160px',
  desktop_4k: '3840px',
} as const;

/* ---------- Interfaces ---------- */
interface CustomTheme {
  screen_sizes: typeof screen_sizes;
}

/* ---------- Types ---------- */
export type Theme = MantineThemeOverride & CustomTheme;

/* ---------- Themes ---------- */
const main_theme: Partial<MantineThemeOverride> = {
  primaryColor: 'blue',
  primaryShade: 7,
  fontFamily: 'Poppins',
};

const merged_theme: Theme = {
  ...merge({}, DEFAULT_THEME, { ...main_theme }),
  screen_sizes,
};

export const theme = merged_theme;
