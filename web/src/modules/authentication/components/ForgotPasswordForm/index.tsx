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
          : 'Por favor, digite um endereço de e-mail válido',
      password: value => {
        if (!/[\d|\w|[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]]{0,7}/.test(value))
          return 'Senha muito curta';

        if (!/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(value))
          return 'Por favor, inclua pelo menos um caractere especial (!@#$%^&*_) em sua senha';

        if (!/\d/.test(value))
          return 'Por favor, inclua pelo menos um número em sua senha';

        return null;
      },
      confirm_password: (value, form) =>
        value !== form.password ? 'Senhas não coincidem' : null,
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
        placeholder="Digite seu e-mail"
        type="email"
        mb="sm"
        disabled
        autoComplete="username"
        {...getInputProps('email')}
      />

      <TextInput
        label="Código"
        placeholder="Digite o código enviado por e-mail"
        type="number"
        mb="sm"
        {...getInputProps('code')}
      />

      <Flex mb="lg" gap="md">
        <PasswordInput
          label="Nova senha"
          placeholder="Digite uma senha forte"
          w="100%"
          autoComplete="new-password"
          {...getInputProps('password')}
        />

        <PasswordInput
          label="Confirme sua senha"
          placeholder="Redigite sua nova senha"
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
        Restaurar minha senha
      </Button>

      <Flex mt="lg" mb="md" align="center" gap="xs" justify="space-between">
        <Link href="/" style={{ display: 'inherit', width: 'fit-content' }}>
          <Text color="blue" size="sm">
            Voltar ao login
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
