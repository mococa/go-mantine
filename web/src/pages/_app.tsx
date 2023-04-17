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

const App = ({
  Component,
  pageProps: props,
  color_scheme: default_color_scheme,
}: AppProps & { color_scheme?: ColorScheme }) => {
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

          <meta name="description" content="%NAME% will do some cool stuff" />
        </Head>

        <AppProvider>
          <Component {...props} />
        </AppProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

App.getInitialProps = async (app_context: AppContext) => {
  const app_props = await NextApp.getInitialProps(app_context);
  const { ctx } = app_context;
  const cookies = cookie.parse(ctx.req?.headers?.cookie || '');

  return {
    ...app_props,
    color_scheme: cookies.color_scheme,
  };
};

export default App;
