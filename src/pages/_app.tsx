import { AppProps } from 'next/app';

import { withDarkMode } from '@/components/ThemedApp';

import '../styles/global.css';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
);

export default withDarkMode(MyApp);
