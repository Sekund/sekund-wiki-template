import { NextSeo } from 'next-seo';
import Document, { Html, Head, Main, NextScript } from 'next/document';

// Need to create a custom _document because i18n support is not compatible with `next export`.
class MyDocument extends Document {
  render() {
    return (
      <Html lang={process.env.LOCALE}>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="1"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Mulish&family=Philosopher&display=swap"
            rel="stylesheet"
          />
          <meta charSet="UTF-8" key="charset" />
          <link
            rel="apple-touch-icon"
            href={`/apple-touch-icon.png`}
            key="apple"
          />
          <link rel="icon" href={`/favicon.png`} sizes="any" />
          <link rel="icon" href={`/favicon.svg`} type="image/svg+xml" />
        </Head>
        <NextSeo
          title={process.env.TITLE}
          description={process.env.DESCRIPTION}
          // canonical={props.canonical}
          openGraph={{
            title: process.env.TITLE,
            description: process.env.DESCRIPTION,
            locale: process.env.LOCALE,
            site_name: process.env.SITE_NAME,
          }}
        />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
