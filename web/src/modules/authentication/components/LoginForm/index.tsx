/* ---------- External ---------- */
import React, { useEffect } from 'react';
import { useForm } from '@mantine/form';
import {
  Alert,
  Button,
  Checkbox,
  Flex,
  PasswordInput,
  Text,
  TextInput,
  Transition,
} from '@mantine/core';
import Link from 'next/link';
import { TbAlertCircle } from 'react-icons/tb';

/* ---------- Module Types ---------- */
import { Authentication } from '_modules/authentication/@types';

/* ---------- Interfaces ---------- */
interface Props {
  onSubmit: (form_values: Authentication.LoginFormProps) => void;
  loading: boolean;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

const error_map: Record<string, string> = {
  'incorrect email or password':
    'Account not found. Please, verify your e-mail or password',
};

export const LoginForm = ({ onSubmit, loading, error, setError }: Props) => {
  /* ---------- Hooks ---------- */
  const {
    isTouched,
    onSubmit: onFormSubmit,
    getInputProps,
  } = useForm<Authentication.LoginFormProps>({
    initialValues: { email: '', password: '', remember_me: false },
    validateInputOnBlur: true,
    validate: {
      email: value =>
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
          ? null
          : 'Please, enter a valid e-mail address',
      password: value => !value,
    },
  });

  /* ---------- Effects ---------- */
  useEffect(() => {
    setError('');
  }, [isTouched, setError]);

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
            title="Oh, bummer!"
            color="red"
            bg="red.1"
            withCloseButton
            closeButtonLabel="Close"
            onClose={() => setError('')}
            mb="md"
            style={styles}
            styles={{ title: { marginBottom: 0 } }}
          >
            {error_map[error] || ''}
          </Alert>
        )}
      </Transition>

      <TextInput
        label="Email"
        placeholder="Enter your e-mail"
        type="email"
        mb="sm"
        autoComplete="username"
        {...getInputProps('email')}
      />

      <PasswordInput
        label="Password"
        placeholder="Enter your password"
        autoComplete="current-password"
        {...getInputProps('password')}
        mb={6}
      />

      <Flex justify="space-between" mt="md">
        <Checkbox
          label="Remember me"
          {...getInputProps('remember_me')}
          styles={{
            input: { cursor: 'pointer' },
            label: { cursor: 'pointer' },
          }}
        />

        <Link
          href="/forgot-password"
          style={{ display: 'inherit', width: 'fit-content' }}
        >
          <Text color="blue" size="sm" component="span">
            Forgot your password?
          </Text>
        </Link>
      </Flex>

      <Button mt="lg" type="submit" fullWidth loading={loading}>
        Sign in
      </Button>

      <Flex mt="lg" align="center" gap="xs">
        <Text size="sm">New around? </Text>

        <Link
          href="/sign-up"
          style={{ display: 'inherit', width: 'fit-content' }}
        >
          <Text color="blue" size="sm" component="span">
            Create your account
          </Text>
        </Link>
      </Flex>
    </form>
  );
};
