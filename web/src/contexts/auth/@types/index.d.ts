export namespace Context {
  export namespace Handlers {
    export interface SignIn {
      email: string;
      password: string;
      remember_me?: boolean;
    }

    export interface SignUp {
      full_name: string;
      email: string;
      password: string;
    }

    export interface Confirm {
      email: string;
      code: string;
    }
  }
}
