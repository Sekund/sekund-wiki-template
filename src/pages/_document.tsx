import Document, { Html, Head, Main, NextScript } from 'next/document';

// Need to create a custom _document because i18n support is not compatible with `next export`.
class MyDocument extends Document {
  render() {
    return (
      <Html lang={process.env.NEXT_PUBLIC_LOCALE}>
        <Head>
          <meta charSet="UTF-8" key="charset" />
          <link
            rel="apple-touch-icon"
            href={`/apple-touch-icon.png`}
            key="apple"
          />
          <link rel="icon" href={`/favicon.png`} sizes="any" />
          <link rel="icon" href={`/favicon.svg`} type="image/svg+xml" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
