/* ---------- External ---------- */
import React, { useState } from 'react';
import { TbAlertCircle } from 'react-icons/tb';
import { useForm } from '@mantine/form';
import {
  Alert,
  Transition,
  Button,
  Flex,
  PasswordInput,
  Text,
  TextInput,
} from '@mantine/core';
import Link from 'next/link';

/* ---------- Module Types ---------- */
import { Authentication } from '_modules/authentication/@types';

/* ---------- Services ---------- */
import { services } from '_services';

/* ---------- Module Components ---------- */
import { ResendButton } from '_modules/authentication/components/ResendCodeButton';

/* ---------- Interfaces ---------- */
interface Props {
  onSubmit: (form_values: Authentication.ForgotPasswordFormProps) => void;
  loading: boolean;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

export const ForgotPasswordForm = ({
  onSubmit,
  loading,
  error,
  setError,
}: Props) => {
  /* ---------- Hooks ---------- */
  const {
    values,
    onSubmit: onFormSubmit,
    getInputProps,
  } = useForm<Authentication.ForgotPasswordFormProps>({
    initialValues: {
      email: '',
      code: '',
      confirm_password: '',
      password: '',
    },
    validateInputOnBlur: true,
    validate: {
      email: value =>
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
          ? null
          : 'Please, enter a valid e-mail address',
      password: value => {
        if (!/[\d|\w|[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]]{0,7}/.test(value))
          return 'Password too short';

        if (!/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(value))
          return 'Please, include at least one special character in your password (!@#$%^&*_)';

        if (!/\d/.test(value))
          return 'Please, include at least one number in your password';

        return null;
      },
      confirm_password: (value, form) =>
        value !== form.password ? "Passwords don't match" : null,
    },
  });

  /* ---------- States ---------- */
  const [resetting_password, setResettingPassword] = useState<boolean>(false);
  const [loading_reset, setLoadingReset] = useState<boolean>(false);
  const [resending_code, setResendingCode] = useState<boolean>(false);

  /* ---------- Handlers ---------- */
  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoadingReset(true);

    try {
      await services.auth.forgot_password({ email: values.email });

      setResettingPassword(true);
    } catch (err) {
      //
    }

    setLoadingReset(false);
  };

  const handleResendCode = async () => {
    setResendingCode(true);

    try {
      await services.auth.resend_verification_code({ email: values.email });
    } catch (err) {
      //
    }

    setResendingCode(false);
  };

  /* ---------- Renderers ---------- */
  const renderResettingPassword = () => (
    <form onSubmit={handleForgotPassword}>
      <TextInput
        label="E-mail"
        placeholder="Enter your e-mail"
        type="email"
        mb="sm"
        disabled={loading_reset}
        autoComplete="username"
        {...getInputProps('email')}
      />

      <Button
        mt="lg"
        type="submit"
        fullWidth
        loading={loading_reset}
        disabled={resending_code}
      >
        Send code
      </Button>

      <Flex mt="lg">
        <Link
          href="/"
          passHref
          style={{ display: 'inherit', width: 'fit-content' }}
        >
          <Text color="blue" size="sm" component="span">
            Go back to login
          </Text>
        </Link>
      </Flex>
    </form>
  );

  if (!resetting_password) return renderResettingPassword();

  return (
    <form onSubmit={onFormSubmit(onSubmit)}>
      <Transition
        mounted={Boolean(error)}
        transition="slide-down"
        duration={400}
        timingFunction="ease"
      >
        {styles => (
          <Alert
            icon={<TbAlertCircle size={18} />}
            title="Oh, não!"
            color="red"
            bg="red.1"
            withCloseButton
            closeButtonLabel="Close"
            onClose={() => setError('')}
            mb="md"
            style={styles}
          >
            {error}
          </Alert>
        )}
      </Transition>

      <TextInput
        label="E-mail"
        placeholder="Enter your e-mail"
        type="email"
        mb="sm"
        disabled
        autoComplete="username"
        {...getInputProps('email')}
      />

      <TextInput
        label="Code"
        placeholder="Enter the code sent by e-mail"
        type="number"
        mb="sm"
        {...getInputProps('code')}
      />

      <Flex mb="lg" gap="md">
        <PasswordInput
          label="New password"
          placeholder="Enter a strong password"
          w="100%"
          autoComplete="new-password"
          {...getInputProps('password')}
        />

        <PasswordInput
          label="Confirm your password"
          placeholder="Retype your new password"
          w="100%"
          autoComplete="new-password"
          {...getInputProps('confirm_password')}
        />
      </Flex>

      <Button
        mt="lg"
        type="submit"
        fullWidth
        loading={loading}
        disabled={resending_code}
      >
        Restore my password
      </Button>

      <Flex mt="lg" mb="md" align="center" gap="xs" justify="space-between">
        <Link href="/" style={{ display: 'inherit', width: 'fit-content' }}>
          <Text color="blue" size="sm">
            Back to login
          </Text>
        </Link>

        <ResendButton
          handleResendCode={handleResendCode}
          resending_code={resending_code}
        />
      </Flex>
    </form>
  );
};
