import { useEffect } from 'react';

import * as Fathom from 'fathom-client';
import { NextSeo } from 'next-seo';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { withDarkMode } from '@/components/ThemedApp';

import '../styles/global.css';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    // Initialize Fathom when the app loads
    // Example: yourdomain.com
    //  - Do not include https://
    //  - This must be an exact match of your domain.
    // - If you're using www. for your domain, make sure you include that
    //   here.
    function onRouteChangeComplete() {
      Fathom.trackPageview();
    }

    if (process.env.NEXT_PUBLIC_FATHOM_TRACKING_CODE) {
      Fathom.load(process.env.NEXT_PUBLIC_FATHOM_TRACKING_CODE, {
        includedDomains: [process.env.NEXT_PUBLIC_DECK_DOMAIN!!],
      });

      // Record a pageview when route changes
      router.events.on('routeChangeComplete', onRouteChangeComplete);

      // Unassign event listener
      return () => {
        router.events.off('routeChangeComplete', onRouteChangeComplete);
      };
    }
    return () => {};
  }, [router.events]);

  return (
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
}

export default withDarkMode(MyApp);
