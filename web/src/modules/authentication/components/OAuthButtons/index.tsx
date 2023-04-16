/* ---------- External ---------- */
import React from 'react';
import { Button, Flex, useMantineTheme } from '@mantine/core';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';

export const OAuthButtons = () => {
  /* ---------- Hooks ---------- */
  const { colorScheme } = useMantineTheme();

  return (
    <Flex mb="lg" gap="sm">
      <Button
        p={8}
        h={54}
        w={54}
        variant="outline"
        color={`gray.${colorScheme === 'light' ? 4 : 8}`}
      >
        <FcGoogle size={24} />
      </Button>

      <Button p={8} h={54} w={54} bg="#0072C6">
        <FaFacebookF size={22} />
      </Button>

      <Button
        p={8}
        h={54}
        w={54}
        variant="outline"
        color={`gray.${colorScheme === 'light' ? 4 : 8}`}
        c="#0072C6"
      >
        <FaLinkedinIn size={24} />
      </Button>
    </Flex>
  );
};
