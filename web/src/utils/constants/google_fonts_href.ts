/* ---------- Constants ---------- */
import { fonts } from './fonts';

export const google_fonts_href = `https://fonts.googleapis.com/css2?${fonts
  .map(
    ({ family, weights }) =>
      `family=${family.replace(/\s/g, '+')}:wght@${weights.join(';')}`,
  )
  .join('&')}&display=swap`;
