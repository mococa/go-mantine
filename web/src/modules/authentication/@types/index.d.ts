export namespace Authentication {
  export interface LoginFormProps {
    email: string;
    password: string;
    remember_me?: boolean;
  }

  export interface RegisterFormProps {
    full_name: string;
    email: string;
    password: string;
    confirm_password: string;
    agreed_with_terms: boolean;
  }

  export interface ForgotPasswordFormProps {
    email: string;
    password: string;
    confirm_password: string;
    code: string;
  }
}
