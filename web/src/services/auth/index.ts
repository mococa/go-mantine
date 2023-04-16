/* ---------- APIs ---------- */
import { apis } from '_services';

/* ---------- Types ---------- */
import { Auth } from '_services/auth/@types';

const sign_out = async () => {
  return apis.public.get('/logout');
};
/**
 * @description Initiates a sign up request to the backend.
 * @property {string} credentials - The user credentials joined by ":" in base64 prefixed with "Basic ".
 */
const sign_up = async ({ credentials }: Auth.SignUpInput) => {
  return apis.public.post('/sign-up', { credentials });
};

/**
 * @description Initiates a sign in request to the backend.
 * @property {string} credentials - The user credentials joined by ":" in base64 prefixed with "Basic ".
 */
const sign_in = async ({ credentials }: Auth.SignInInput) => {
  return apis.public.post<Auth.TokensData>('/sign-in', { credentials });
};

/**
 * @description Initiates a verification request to the backend.
 * @property {string} code - Verification code sent by email
 * @property {string} email - User e-mail address
 */
const verify_user = async ({ code, email }: Auth.VerificationInput) => {
  return apis.public.post('/confirm-user', { code, email });
};

/**
 * @description Resends verification code to user email
 * @property {string} email - User e-mail address
 */
const resend_verification_code = async ({ email }: Auth.ResendCodeInput) => {
  return apis.public.post('/resend-confirmation-code', { email });
};

/**
 * @description Sends verification code to user email in order to reset their password
 * @property {string} email - User e-mail address
 */
const forgot_password = async ({ email }: Auth.ForgotPasswordInput) => {
  return apis.public.post('/forgot-password', { email });
};

/**
 * @description Resets user password
 * @property {string} email - User e-mail address
 * @property {string} code - Code sent by e-mail
 * @property {string} password - New password
 */
const confirm_forgot_password = async ({
  email,
  code,
  password,
}: Auth.ConfirmForgotPasswordInput) => {
  return apis.public.put('/forgot-password', { email, code, password });
};

/**
 * @description Initiates the refresh token request to the API.
 * @property {string} refresh_token
 */
const refresh_tokens = ({ refresh_token }: Auth.RefreshTokensInput) => {
  return apis.public.get<Auth.RefreshTokenOutput>('/refresh-tokens', {
    headers: {
      Authorization: refresh_token,
    },
  });
};

export const auth = {
  sign_up,
  sign_in,
  sign_out,
  verify_user,
  resend_verification_code,
  forgot_password,
  confirm_forgot_password,
  refresh_tokens,
};
