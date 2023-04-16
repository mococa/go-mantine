/* ---------- External ---------- */
import React from 'react';
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';
import { ServerStyles, createStylesServer } from '@mantine/next';

/* ---------- Initial Props ---------- */
const mantine_props = createStylesServer();

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    try {
      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: [
          initialProps.styles,
          <ServerStyles
            html={initialProps.html}
            server={mantine_props}
            key="styles"
          />,
        ],
      };
    } finally {
      //
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head />

        <body>
          <Main />

          <NextScript />
        </body>
      </Html>
    );
  }
}
