/* ---------- External ---------- */
import React from 'react';
import Head from 'next/head';
import NextApp, { AppProps, AppContext } from 'next/app';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

/* ---------- Styles ---------- */
import '_styles/globals.css';
import { theme } from '_styles/theme';

/* ---------- Contexts ---------- */
import { AppProvider } from '_contexts';

/* ---------- Constants ---------- */
import { google_fonts_href } from '_utils/constants/google_fonts_href';

const App = ({ Component, pageProps: props }: AppProps) => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <Notifications />

      <link href={google_fonts_href} rel="stylesheet" />

      <Head>
        <link rel="icon" href="/favicon.ico" />

        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />

        <meta name="description" content="%NAME% Panel" />
      </Head>

      <AppProvider>
        <Component {...props} />
      </AppProvider>
    </MantineProvider>
  );
};

App.getInitialProps = async (app_context: AppContext) => {
  const appProps = await NextApp.getInitialProps(app_context);

  return {
    ...appProps,
  };
};

export default App;
