/* ---------- External ---------- */
import React, { useState } from 'react';
import {
  Paper,
  Box,
  Title,
  Text,
  Center,
  PinInput,
  Modal,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { HiOutlineMailOpen } from 'react-icons/hi';

/* ---------- Common Components ---------- */
import { Logo } from '_common/components/Logo';

/* ---------- Module Types ---------- */
import { Authentication } from '_modules/authentication/@types';

/* ---------- Contexts ---------- */
import { useAuth } from '_contexts/auth';

/* ---------- Module Components ---------- */
import { LoginForm } from '_modules/authentication/components/LoginForm';
import { RegisterForm } from '_modules/authentication/components/RegisterForm';

/* ---------- Helpers ---------- */
import { get_axios_error } from '_utils/helpers/errors/get_axios_error';

/* ---------- Services ---------- */
import { services } from '_services';
import { useRouter } from 'next/router';

/* ---------- Styles ---------- */
import {
  FormContainerBoxSx,
  FormTitleSx,
  PaperContainerSx,
} from '_modules/authentication/styles';

/* ---------- Interfaces ---------- */
interface Props {
  sign_in?: boolean;
  sign_up?: boolean;
}

export const AuthTemplate = ({ sign_in, sign_up }: Props) => {
  /* ---------- Hooks ---------- */
  const { push, query } = useRouter();
  const { handleSignIn, handleSignUp, handleVerifyAccount } = useAuth();

  /* ---------- States ---------- */
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [local_user, setLocalUser] = useState<Authentication.LoginFormProps>({
    email: '',
    password: '',
    remember_me: false,
  });
  const [confirm_modal_open, setConfirmModalOpen] = useState<boolean>(false);

  /* ---------- Handlers ---------- */
  const handleLogin = async ({
    email,
    password,
    remember_me,
  }: Authentication.LoginFormProps) => {
    setLoading(true);

    setLocalUser({ email, password, remember_me });

    try {
      await handleSignIn({ email, password, remember_me });

      if (query.redirect) push(String(query.redirect));
    } catch (err) {
      const axios_error = get_axios_error(err);

      if (axios_error === 'user is not confirmed') {
        services.auth.resend_verification_code({ email });

        setConfirmModalOpen(true);
      } else {
        setError(axios_error || '');
      }
    }

    setLoading(false);
  };

  const handleRegister = async ({
    full_name,
    email,
    password,
  }: Authentication.RegisterFormProps) => {
    setLoading(true);

    try {
      await handleSignUp({ email, full_name, password });

      setLocalUser({ email, password });
      setConfirmModalOpen(true);
    } catch (err) {
      setError(get_axios_error(err) || '');
      //
    }

    setLoading(false);
  };

  const handleConfirmAccount = async (code: string) => {
    setLoading(true);

    try {
      await handleVerifyAccount({ code, email: local_user.email });
      await handleLogin(local_user);
      push('/');
    } catch (err) {
      notifications.show({ message: get_axios_error(err) || '', color: 'red' });
    }

    setLoading(false);
  };

  if (!sign_in && !sign_up)
    throw Error(
      'Improper component.\nPlease, set either the prop `sign_in` or `sign_up` initiating it',
    );

  return (
    <Paper sx={PaperContainerSx}>
      <Box sx={FormContainerBoxSx}>
        <Logo width="100" height="20" />

        <Title order={3} sx={FormTitleSx}>
          {sign_in ? 'Login' : 'Join us'}
        </Title>

        <Text mb="sm">
          {sign_in
            ? 'Access your %NAME% account here!'
            : 'Create your %NAME% account for free now!'}
        </Text>

        {/* <OAuthButtons />

        <Divider label="Or" labelPosition="center" mb="xs" /> */}

        {sign_in && (
          <LoginForm
            onSubmit={handleLogin}
            loading={loading}
            error={error}
            setError={setError}
          />
        )}

        {sign_up && (
          <RegisterForm loading={loading} onSubmit={handleRegister} />
        )}

        <Modal
          opened={confirm_modal_open}
          centered
          styles={{
            header: { paddingBottom: 0, position: 'initial' },
            content: { minWidth: 520 },
          }}
          onClose={() => null}
          withCloseButton={false}
          closeOnClickOutside={false}
          closeOnEscape={false}
        >
          <Title order={3} mb="sm" align="center" style={{ zIndex: 2 }}>
            Confirm your account
          </Title>

          <Center c="blue.8" mb="md">
            <HiOutlineMailOpen size={64} />
          </Center>

          <Text color="gray.7" align="center">
            A verification code has been sent to your e-mail
          </Text>

          <Text color="gray.7" align="center">
            Please, enter the code sent to{' '}
            <Text weight={500} component="span">
              {local_user.email}
            </Text>
          </Text>

          <Center>
            <PinInput
              length={6}
              mt="md"
              mb="md"
              onComplete={handleConfirmAccount}
              autoFocus
              placeholder=""
              disabled={loading}
            />
          </Center>
        </Modal>
      </Box>
    </Paper>
  );
};
