/* ---------- External ---------- */
import React from 'react';
import { Flex, Image } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

/* ---------- Module Templates ---------- */
import { ForgotPasswordTemplate } from '_modules/authentication/templates/ForgotPasswordTemplate';

/* ---------- Styles ---------- */
import { AuthPageSx } from '_modules/authentication/styles';

export const ForgotPassword = () => {
  /* ---------- Hooks ---------- */
  const mobile = useMediaQuery('(max-width: 500px)');

  return (
    <Flex sx={AuthPageSx}>
      <ForgotPasswordTemplate />

      <Image
        alt="Authentication image"
        src="/img/authentication-image.jpg"
        height={mobile ? '50vh' : '100vh'}
        style={{ flex: 1 }}
        styles={{ image: { objectPosition: 'bottom' } }}
      />
    </Flex>
  );
};
