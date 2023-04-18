/* ---------- External ---------- */
import React, {
  createContext,
  useContext,
  useMemo,
  useCallback,
  useState,
  useEffect,
} from 'react';
import jwt_decode from 'jwt-decode';

/* ---------- Context Types ---------- */
import { Context } from '_contexts/auth/@types';

/* ---------- Types ---------- */
import { Models } from '_@types/models';
import { Auth } from '_@types/auth';

/* ---------- Services ---------- */
import { services } from '_services';

/* ---------- Utils ---------- */
import { setStorageTokens } from '_utils/helpers/auth/setStorageTokens';
import { getStorageTokens } from '_utils/helpers/auth/getStorageTokens';

/* ---------- Interfaces ---------- */
interface AuthContextData {
  user: Models.User;
  setUser: (new_user: Models.User) => void;

  handleResetAuth: () => void;

  handleChangeProfilePicture: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  handleSignIn: (props: Context.Handlers.SignIn) => Promise<void>;
  handleSignUp: (props: Context.Handlers.SignUp) => Promise<void>;
  handleVerifyAccount: (props: Context.Handlers.Confirm) => Promise<void>;
}

interface DefaultHookProps {
  id_token?: string;
}

interface Props {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthProvider: React.FC<Props> = ({ children }) => {
  /* ---------- States ---------- */
  const [user, setUser] = useState<Models.User>({} as Models.User);

  /* ---------- Callbacks ---------- */
  const handleResetAuth = useCallback(() => {
    setUser({} as Models.User);
  }, []);

  const handleChangeProfilePicture = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files) return;

      const image = event.target.files[0];

      const new_user = { ...user, picture: URL.createObjectURL(image) };

      setUser(new_user);

      // Todo: upload to bucket and update on db
    },
    [setUser, user],
  );

  const handleParseTokens = useCallback(
    async (
      access_token: string,
      id_token: string,
      refresh_token: string,
      persist: boolean,
    ) => {
      if (!access_token || !id_token || !refresh_token) return;

      const {
        email,
        sub,
        'custom:full_name': full_name,
        picture,
        exp,
      }: Auth.Decoded = jwt_decode(id_token);

      if (Date.now() > exp * 1000) {
        const { data } = await services.auth.refresh_tokens({ refresh_token });

        setStorageTokens({
          access_token: data.AccessToken,
          id_token: data.IdToken,
          refresh_token,
          storage_method: persist ? 'local' : 'session',
        });
      }

      setUser({
        email,
        sub,
        picture,
        full_name,
      });
    },
    [],
  );

  const handleSignIn = useCallback(
    async ({ email, password, remember_me }: Context.Handlers.SignIn) => {
      const credentials = `Basic ${Buffer.from(`${email}:${password}`).toString(
        'base64',
      )}`;

      const { data } = await services.auth.sign_in({ credentials });

      const {
        AccessToken: access_token,
        IdToken: id_token,
        RefreshToken: refresh_token,
      } = data;

      handleParseTokens(
        access_token,
        id_token,
        refresh_token,
        remember_me || false,
      );

      setStorageTokens({
        id_token,
        refresh_token,
        access_token,
        storage_method: remember_me ? 'local' : 'session',
      });
    },
    [handleParseTokens],
  );

  const handleSignUp = useCallback(
    async ({ email, full_name, password }: Context.Handlers.SignUp) => {
      const credentials = Buffer.from(
        `${full_name}:${email}:${password}`,
      ).toString('base64');

      await services.auth.sign_up({ credentials });
    },
    [],
  );

  const handleVerifyAccount = useCallback(
    async ({ code, email }: Context.Handlers.Confirm) => {
      await services.auth.verify_user({ code, email });
    },
    [],
  );

  /* ---------- Effects ---------- */
  useEffect(() => {
    const client_side = typeof window !== 'undefined';

    if (!client_side) return undefined;

    const { access_token, id_token, refresh_token } = getStorageTokens();

    if ([access_token, id_token, refresh_token].every(Boolean))
      handleParseTokens(
        access_token,
        id_token,
        refresh_token,
        getStorageTokens().persist,
      );

    return undefined;
  }, [handleParseTokens]);

  /* ---------- Memos ---------- */
  const value = useMemo(
    () => ({
      user,
      setUser,

      handleResetAuth,

      handleChangeProfilePicture,
      handleSignIn,
      handleSignUp,
      handleVerifyAccount,
    }),
    [
      user,
      setUser,

      handleChangeProfilePicture,
      handleSignIn,
      handleSignUp,
      handleVerifyAccount,
      handleResetAuth,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (props?: DefaultHookProps) => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('Error inside of useAuth');
  }

  if (!props?.id_token) return context;

  try {
    const {
      email,
      sub,
      'custom:full_name': full_name,
      picture,
    }: Auth.Decoded = jwt_decode(props.id_token);

    context.user = { email, sub, full_name, picture };
  } catch (error) {
    //
  }

  return context;
};
