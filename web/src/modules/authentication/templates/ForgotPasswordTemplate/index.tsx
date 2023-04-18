/* ---------- External ---------- */
import React, { useState } from 'react';
import { Paper, Box, Title, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/router';

/* ---------- Common Components ---------- */
import { Logo } from '_common/components/Logo';

/* ---------- Module Types ---------- */
import { Authentication } from '_modules/authentication/@types';

/* ---------- Module Components ---------- */
import { ForgotPasswordForm } from '_modules/authentication/components/ForgotPasswordForm';

/* ---------- Services ---------- */
import { services } from '_services';

/* ---------- Utils ---------- */
import { get_axios_error } from '_utils/helpers/errors/get_axios_error';

/* ---------- Styles ---------- */
import {
  FormContainerBoxSx,
  FormTitleSx,
  PaperContainerSx,
} from '_modules/authentication/styles';

/* ---------- Interfaces ---------- */

export const ForgotPasswordTemplate = () => {
  /* ---------- Hooks ---------- */
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
    <Paper sx={PaperContainerSx}>
      <Box sx={FormContainerBoxSx}>
        <Logo width="100" height="20" />

        <Title order={3} sx={FormTitleSx}>
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
