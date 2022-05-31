import { NextSeo } from 'next-seo';
import { AppProps } from 'next/app';
import Head from 'next/head';

import { withDarkMode } from '@/components/ThemedApp';

import '../styles/global.css';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1"
        key="viewport"
      />
    </Head>
    <NextSeo
      title={process.env.NEXT_PUBLIC_TITLE}
      description={process.env.NEXT_PUBLIC_DESCRIPTION}
      // canonical={props.canonical}
      openGraph={{
        title: process.env.NEXT_PUBLIC_TITLE,
        description: process.env.NEXT_PUBLIC_DESCRIPTION,
        locale: process.env.NEXT_PUBLIC_LOCALE,
        site_name: process.env.NEXT_PUBLIC_SITE_NAME,
      }}
    />
    <Component {...pageProps} />
  </>
);

export default withDarkMode(MyApp);
