/* ---------- External ---------- */
import React, { useEffect, useState } from 'react';
import { useInterval } from '@mantine/hooks';
import { Button } from '@mantine/core';

/* ---------- Interfaces ---------- */
interface Props {
  resending_code: boolean;
  handleResendCode: () => void;
}

export const ResendButton = ({ handleResendCode, resending_code }: Props) => {
  /* ---------- States ---------- */
  const [resend_timeout, setResendTimeout] = useState<number>(10);

  /* ---------- Hooks ---------- */
  const { start, stop } = useInterval(() => {
    if (resend_timeout) setResendTimeout(r => r - 1);
  }, 1000);

  /* ---------- Effects ---------- */
  useEffect(() => {
    start();

    return stop;
  }, [start, stop]);

  return (
    <Button
      variant="subtle"
      compact
      type="button"
      onClick={() => {
        start();
        setResendTimeout(10);
        handleResendCode();
      }}
      disabled={resending_code || resend_timeout > 0}
    >
      Resend code {resend_timeout > 0 ? `(${resend_timeout}s)` : ''}
    </Button>
  );
};
