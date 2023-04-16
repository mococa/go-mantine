/* ---------- Namespaces ---------- */
export namespace Auth {
  export interface SignUpInput {
    credentials: string;
  }

  export interface SignInInput {
    credentials: string;
  }

  export interface VerificationInput {
    code: string;
    email: string;
  }

  export interface ResendCodeInput {
    email: string;
  }

  export interface TokensData {
    AccessToken: string;
    IdToken: string;
    RefreshToken: string;
  }

  export interface ForgotPasswordInput {
    email: string;
  }

  export interface ConfirmForgotPasswordInput {
    email: string;
    code: string;
    password: string;
  }

  export interface RefreshTokensInput {
    refresh_token: string;
  }

  export interface RefreshTokenOutput {
    AccessToken: string;
    IdToken: string;
    RefreshToken: string | null;
    ExpiresIn: number;
    TokenType: 'Bearer';
  }
}
