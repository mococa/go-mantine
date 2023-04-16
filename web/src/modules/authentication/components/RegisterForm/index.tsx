/* ---------- External ---------- */
import React from 'react';
import { useForm } from '@mantine/form';
import {
  Button,
  Checkbox,
  Flex,
  PasswordInput,
  Text,
  TextInput,
} from '@mantine/core';
import Link from 'next/link';

/* ---------- Module Types ---------- */
import { Authentication } from '_modules/authentication/@types';

/* ---------- Interfaces ---------- */
interface Props {
  onSubmit: (form_values: Authentication.RegisterFormProps) => void;
  loading: boolean;
}

export const RegisterForm = ({ onSubmit, loading }: Props) => {
  /* ---------- Hooks ---------- */
  const { onSubmit: onFormSubmit, getInputProps } =
    useForm<Authentication.RegisterFormProps>({
      initialValues: {
        full_name: '',
        email: '',
        password: '',
        confirm_password: '',
        agreed_with_terms: false,
      },
      validateInputOnBlur: true,
      validate: {
        full_name: value =>
          !value.includes(' ') ? 'Please, enter your full name' : null,
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
        agreed_with_terms: value =>
          !value
            ? 'You must agree with the terms and conditions in order to sign up'
            : null,
      },
    });

  return (
    <form onSubmit={onFormSubmit(onSubmit)}>
      <TextInput
        label="Full name"
        placeholder="Enter your name"
        mb="sm"
        {...getInputProps('full_name')}
      />

      <TextInput
        label="E-mail"
        placeholder="Enter your e-mail"
        type="email"
        autoComplete="username"
        mb="sm"
        {...getInputProps('email')}
      />

      <Flex mb="lg" gap="md">
        <PasswordInput
          label="Password"
          placeholder="Enter a strong password"
          autoComplete="new-password"
          w="100%"
          {...getInputProps('password')}
        />

        <PasswordInput
          label="Confirm password"
          placeholder="Re-enter your password"
          autoComplete="new-password"
          w="100%"
          {...getInputProps('confirm_password')}
        />
      </Flex>

      <Checkbox
        mt="xs"
        label={
          <Text size="sm">
            I agree with the{' '}
            <Link href="/terms-and-privacy">
              <Text color="blue" size="sm" component="span">
                Terms and conditions of use
              </Text>
            </Link>
          </Text>
        }
        {...getInputProps('agreed_with_terms')}
        styles={{
          input: { cursor: 'pointer' },
          label: { cursor: 'pointer' },
        }}
      />

      <Button mt="lg" type="submit" fullWidth loading={loading}>
        Create account
      </Button>

      <Flex mt="lg" mb="md" align="center" gap={4}>
        <Text size="sm" style={{ display: 'contents' }}>
          Already have an account?{' '}
          <Link href="/" style={{ display: 'inherit', width: 'fit-content' }}>
            <Text color="blue" size="sm" component="span">
              Sign in here
            </Text>
          </Link>
        </Text>
      </Flex>
    </form>
  );
};
