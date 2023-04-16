/* ---------- External ---------- */
import React from 'react';
import { Flex, Image } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

/* ---------- Module Templates ---------- */
import { AuthTemplate } from '_modules/authentication/templates/AuthTemplate';

export const SignIn = () => {
  /* ---------- Hooks ---------- */
  const mobile = useMediaQuery('(max-width: 500px)');

  return (
    <Flex w="100%" direction={mobile ? 'column' : 'row'}>
      <AuthTemplate sign_in />

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
