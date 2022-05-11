import { NextSeo } from 'next-seo';
import Document, { Html, Head, Main, NextScript } from 'next/document';

import { AppConfig } from '../utils/AppConfig';

// Need to create a custom _document because i18n support is not compatible with `next export`.
class MyDocument extends Document {
  render() {
    return (
      <Html lang={AppConfig.locale}>
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
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1"
            key="viewport"
          />
          <link
            rel="apple-touch-icon"
            href={`/apple-touch-icon.png`}
            key="apple"
          />
          <link rel="icon" href={`/favicon.png`} sizes="any" />
          <link rel="icon" href={`/favicon.svg`} type="image/svg+xml" />
        </Head>
        <NextSeo
          title={AppConfig.title}
          description={AppConfig.description}
          // canonical={props.canonical}
          openGraph={{
            title: AppConfig.title,
            description: AppConfig.description,
            // url: props.canonical,
            locale: AppConfig.locale,
            site_name: AppConfig.site_name,
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
