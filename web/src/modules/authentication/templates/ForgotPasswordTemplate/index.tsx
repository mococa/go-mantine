/* ---------- External ---------- */
import React, { useState } from 'react';
import { Paper, Box, Title, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

/* ---------- Common Components ---------- */
import { Logo } from '_common/components/Logo';

/* ---------- Module Types ---------- */
import { Authentication } from '_modules/authentication/@types';

/* ---------- Module Components ---------- */
import { ForgotPasswordForm } from '_modules/authentication/components/ForgotPasswordForm';
import { services } from '_services';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/router';
import { get_axios_error } from '_utils/helpers/errors/get_axios_error';

/* ---------- Interfaces ---------- */

export const ForgotPasswordTemplate = () => {
  /* ---------- Hooks ---------- */
  const mobile = useMediaQuery('(max-width: 500px)');
  const large_screen = useMediaQuery('(min-width: 1920px)');

  const { push } = useRouter();

  /* ---------- States ---------- */
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  /* ---------- Handlers ---------- */
  const handleForgotPassword = async ({
    code,
    email,
    password,
  }: Authentication.ForgotPasswordFormProps) => {
    setLoading(true);

    try {
      await services.auth.reset_password({ email, code, password });

      notifications.show({
        message: 'Your password has been successfully changed.',
      });
      push('/');
    } catch (err) {
      setError(get_axios_error(err) || '');
    }

    setLoading(false);
  };

  return (
    <Paper
      mih="100vh"
      p={`${mobile ? '96px' : '0'} ${mobile ? 12 : 56}px 0`}
      style={{ flex: 1, display: 'flex', placeContent: 'center' }}
    >
      <Box
        maw={large_screen ? 500 : 460}
        m={`${!mobile ? 'auto' : '0'} 0`}
        style={{ width: '100%' }}
      >
        <Logo width="100" height="20" />

        <Title order={mobile ? 3 : (large_screen && 2) || 3} mt="sm" mb={4}>
          Forgot password
        </Title>

        <Text mb="sm">Restore your password if you forgot it here</Text>

        <ForgotPasswordForm
          loading={loading}
          onSubmit={handleForgotPassword}
          error={error}
          setError={setError}
        />
      </Box>
    </Paper>
  );
};
