/* ---------- External ---------- */
import React, { SVGProps } from 'react';
import { Box } from '@mantine/core';
import Link from 'next/link';

/* ---------- Assets ---------- */
import LogoSVG from 'public/img/logo.svg';

/* ---------- Styles ---------- */
import { LogoBoxSx } from './styles';

/* ---------- Interfaces ---------- */
interface Props extends SVGProps<SVGSVGElement> {
  clickable?: boolean;
}

export const Logo = ({ clickable, ...props }: Props) => {
  /* ---------- Renderers ---------- */
  const renderLogoWrapper = () =>
    !clickable ? (
      <LogoSVG {...props} />
    ) : (
      <Link href="/">
        <LogoSVG {...props} />
      </Link>
    );

  return <Box sx={LogoBoxSx}>{renderLogoWrapper()}</Box>;
};
