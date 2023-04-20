/* ---------- External ---------- */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import NextApp, { AppProps, AppContext } from 'next/app';
import {
  MantineProvider,
  ColorScheme,
  ColorSchemeProvider,
} from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import cookie from 'cookie';

/* ---------- Styles ---------- */
import '_styles/globals.css';
import { theme } from '_styles/theme';

/* ---------- Contexts ---------- */
import { AppProvider } from '_contexts';

/* ---------- Constants ---------- */
import { google_fonts_href } from '_utils/constants/google_fonts_href';

/* ---------- Interfaces ---------- */
interface Props extends AppProps {
  color_scheme: ColorScheme;
  id_token: string;
}

const App = ({
  Component,
  pageProps: props,
  color_scheme: default_color_scheme,
  id_token,
}: Props) => {
  /* ---------- States ---------- */
  const [check_browser_scheme, setCheckBrowserScheme] = useState<boolean>(
    Boolean(default_color_scheme),
  );

  const [color_scheme, setColorScheme] = useState<ColorScheme>(
    default_color_scheme || 'light',
  );

  /* ---------- Effects ---------- */
  useEffect(() => {
    // Respecting browser color scheme preference
    if (default_color_scheme || check_browser_scheme) return;

    setCheckBrowserScheme(true);

    const media_query = window.matchMedia('(prefers-color-scheme: dark)');
    const scheme = media_query.matches ? 'dark' : 'light';

    setColorScheme(scheme);

    const cookie_expire = { maxAge: 60 * 60 * 24 * 30 };

    const theme_cookie = cookie.serialize(
      'color_scheme',
      scheme,
      cookie_expire,
    );

    document.cookie = theme_cookie;
  }, [default_color_scheme, check_browser_scheme]);

  /* ---------- Handlers ---------- */
  const handleToggleColorScheme = (color?: ColorScheme) => {
    const next_color = color || (color_scheme === 'dark' ? 'light' : 'dark');

    setColorScheme(next_color);

    // when color scheme is updated save it to cookie
    const theme_cookie = cookie.serialize('color_scheme', next_color, {
      maxAge: 60 * 60 * 24 * 30,
    });

    document.cookie = theme_cookie;
  };

  return (
    <ColorSchemeProvider
      colorScheme={color_scheme}
      toggleColorScheme={handleToggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ ...theme, colorScheme: color_scheme }}
      >
        <Notifications />

        <link href={google_fonts_href} rel="stylesheet" />

        <Head>
          <link rel="icon" href="/favicon.ico" />

          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />

          <title>%NAME%</title>

          <meta
            name="description"
            content="%NAME% will do some cool stuff 😎"
          />
        </Head>

        <AppProvider {...props} id_token={id_token}>
          <Component {...props} />
        </AppProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

App.getInitialProps = async (props: AppContext) => {
  const appProps = await NextApp.getInitialProps(props);

  const { ctx } = props;

  const cookies = cookie.parse(ctx.req?.headers?.cookie || '');

  const { id_token } = cookies;

  const current_route = (ctx.asPath || '').replace(/^\/+/, '');

  const protected_routes = ['/protected'];

  const should_redirect =
    !id_token &&
    !current_route.includes('?redirect=') &&
    current_route !== '/' &&
    protected_routes.some(route => current_route.includes(route.slice(1)));

  if (should_redirect && ctx.res) {
    // Redirect to the login page if user is not logged in on a protected route
    ctx.res.writeHead(302, {
      Location: `/?redirect=${encodeURIComponent(current_route)}`,
    });

    ctx.res.end();
  }

  return {
    ...appProps,
    color_scheme: cookies.color_scheme as ColorScheme,
    id_token: id_token || '',
  };
};

export default App;
