import { title } from 'process';

import Head from 'next/head';

type Props = {
  twitterHandle?: string;
  title?: string;
  description?: string;
  userName?: string;
  imageUrl?: string;
  url?: string;
};

const SocialMetatags = (props: Props) => (
  <Head>
    <meta name="twitter:card" content="summary_large_image" />
    {props.twitterHandle ? (
      <meta name="twitter:site" content={props.twitterHandle} />
    ) : null}
    <meta name="twitter:title" content={title} />
    {props.userName ? <meta name="author" content={props.userName} /> : null}
    {props.description ? (
      <>
        <meta name="twitter:description" content={props.description} />
        <meta name="description" content={props.description} />
      </>
    ) : null}
    {props.imageUrl ? (
      <meta name="twitter:image" content={props.imageUrl} />
    ) : null}
    <meta property="og:type" content="article" />
    <meta property="og:title" content={props.title} />
    {props.description ? (
      <meta property="og:description" content={props.description} />
    ) : null}
    <meta property="og:url" content={props.url} />
    {props.imageUrl ? (
      <meta property="og:image" content={props.imageUrl} />
    ) : null}
  </Head>
);
export default SocialMetatags;
