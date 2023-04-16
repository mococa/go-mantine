/* ---------- External ---------- */
import React from 'react';
import { Flex, Image } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

/* ---------- Module Components ---------- */
import { AuthTemplate } from '_modules/authentication/templates/AuthTemplate';

export const SignUp = () => {
  /* ---------- Hooks ---------- */
  const mobile = useMediaQuery('(max-width: 500px)');

  return (
    <Flex w="100%" direction={mobile ? 'column' : 'row'}>
      <AuthTemplate sign_up />

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
