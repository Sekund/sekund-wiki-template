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
    <Component {...pageProps} />
  </>
);

export default withDarkMode(MyApp);
