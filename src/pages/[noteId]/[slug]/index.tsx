/* eslint-disable no-underscore-dangle */
import React from 'react';

import fm from 'front-matter';
import { GetStaticProps } from 'next';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { NextSeo } from 'next-seo';
import DefaultErrorPage from 'next/error';
import Head from 'next/head';
import Link from 'next/link';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { duotoneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import readingTime from 'reading-time';
import remarkGfm from 'remark-gfm';
import slugify from 'slugify';

import { transformLinks, transformInclusions } from '@/common/markdown-utils';
import FeedbackCTA from '@/components/FeedbackCTA';
import PostMetadata from '@/components/PostMetadata';
import Layout from '@/layout/Layout';

import { getHeaderSource, logIn } from '../../../common/utils';
import { BrokenLink } from '../../../components/links/BrokenLink';
import { ExternalLink } from '../../../components/links/ExternalLink';
import { LeafLink } from '../../../components/links/LeafLink';
import { SeedlingLink } from '../../../components/links/SeedlingLink';
import { SeedLink } from '../../../components/links/SeedLink';
import { WiltLink } from '../../../components/links/WiltLink';
import { Note } from '../../../domain/Note';

type PostedNoteProps = {
  imageUrl: string;
  category: string;
  title: string;
  subtitle?: string;
  description: string;
  author: string;
  source: MDXRemoteSerializeResult<Record<string, unknown>>;
  headerSource?: MDXRemoteSerializeResult<Record<string, unknown>>;
  date: number;
  minutes: number;
  url: string;
  noteId: string;
  userId: string;
  avatarImage?: string;
  userName?: string;
  twitterHandle?: string;
  linkedInPage?: string;
  personalPage?: string;
  notFound?: boolean;
};

type CodeProps = {
  className: string;
} & React.HTMLAttributes<HTMLPreElement>;

type DependencyProps = {
  src: string;
};

export function PostedNote({
  title,
  subtitle,
  description,
  url,
  imageUrl,
  twitterHandle,
  source,
  headerSource,
  date,
  noteId,
  userId,
  avatarImage,
  userName,
  linkedInPage,
  personalPage,
  minutes,
  notFound,
}: PostedNoteProps) {
  const Inclusion = ({ src }: DependencyProps) => {
    if (src.match(/(.)*(.jpg|.jpeg|.gif|.png)/)) {
      let image = src;
      let caption = '';
      if (src.indexOf('|') !== -1) {
        const splits = image.split('|');
        image = splits[0]!;
        // eslint-disable-next-line prefer-destructuring
        caption = splits[1]!;
      }
      if (caption.length > 0) {
        return (
          <div className="relative inline-block my-0">
            <img
              alt={caption}
              style={{ width: '100%' }}
              className="my-0"
              src={`https://sekund-sekund-dependencies.s3.amazonaws.com/${userId}/${noteId}/assets/${image}`}
            />
            <div
              className="absolute text-sm italic leading-snug text-white left-4 sm:left-6 lg:left-8 bottom-6 align-left"
              style={{ width: '75%' }}
            >
              {caption}
            </div>
          </div>
        );
      }
      return (
        <img
          alt={caption}
          src={`https://sekund-sekund-dependencies.s3.amazonaws.com/${userId}/${noteId}/assets/${image}`}
        />
      );
    }
    return (
      <span
        className="block px-2 py-1 my-4 text-center text-gray-700 rounded-sm building"
        style={{ fontFamily: 'hero-new' }}
      >
        [TBD: Note Inclusion: {src}]
      </span>
    );
  };

  const SocialMetatags = () => (
    <Head>
      <meta name="twitter:card" content="summary_large_image" />
      {twitterHandle ? (
        <meta name="twitter:site" content={twitterHandle} />
      ) : null}
      <meta name="twitter:title" content={title} />
      {userName ? <meta name="author" content={userName} /> : null}
      {description ? (
        <>
          <meta name="twitter:description" content={description} />
          <meta name="description" content={description} />
        </>
      ) : null}
      {imageUrl ? <meta name="twitter:image" content={imageUrl} /> : null}
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      {description ? (
        <meta property="og:description" content={description} />
      ) : null}
      <meta property="og:url" content={url} />
      {imageUrl ? <meta property="og:image" content={imageUrl} /> : null}
    </Head>
  );

  function Code({ className, children, ...props }: CodeProps) {
    const match = /language-(\w+)/.exec(className || '');
    return match ? (
      <SyntaxHighlighter
        // eslint-disable-next-line react/no-children-prop
        children={String(children).replace(/\n$/, '')}
        style={duotoneLight}
        language={match[1]}
        PreTag="div"
        {...props}
      />
    ) : (
      <code className={className}>{children}</code>
    );
  }

  function Content() {
    return (
      <>
        <NextSeo
          title={title}
          description={subtitle}
          openGraph={{
            title,
            description: subtitle,
            locale: process.env.NEXT_PUBLIC_LOCALE,
            site_name: process.env.NEXT_PUBLIC_SITE_NAME,
          }}
        />
        <div className="py-8 overflow-hidden bg-white-4 dark:bg-gray-4">
          <div className="sekund-content">
            <div className="mx-auto prose prose-lg dark:prose-invert max-w-prose sekund-header">
              <PostMetadata
                {...{
                  title,
                  subtitle,
                  minutes,
                  userName,
                  avatarImage,
                  date,
                  url,
                  twitterHandle,
                  linkedInPage,
                  personalPage,
                }}
              />
            </div>
            <div className="p-0 mx-auto mt-6 prose prose-lg dark:prose-invert dark:prose-dark max-w-prose ">
              <MDXRemote
                {...source}
                components={{
                  Code,
                  Inclusion,
                  Link,
                  SeedLink,
                  SeedlingLink,
                  LeafLink,
                  WiltLink,
                  BrokenLink,
                  ExternalLink,
                }}
              />
            </div>
          </div>
        </div>
      </>
    );
  }

  return notFound ? (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <DefaultErrorPage statusCode={404} />
    </>
  ) : (
    <>
      <SocialMetatags />
      <Layout headerSource={headerSource}>
        <div className="flex flex-col">
          <Content />
          <FeedbackCTA {...{ noteId, title }} />
        </div>
      </Layout>
    </>
  );
}

export default PostedNote;

function isSekundPublic(domain: string | undefined): boolean {
  return domain === 'public.sekund.org';
}

export async function getStaticPaths() {
  const { NEXT_PUBLIC_DECK_DOMAIN, GROUP_ID } = process.env;
  const client = await logIn();
  const notes: Note[] = await client.functions.callFunction(
    isSekundPublic(NEXT_PUBLIC_DECK_DOMAIN) ? 'publicNotes' : 'groupNotes',
    GROUP_ID
  );
  const paths = notes.map((note) => {
    const content = fm(note.content);
    let title = note.title.replace('.md', '');
    if (content.attributes && (content.attributes as any).title) {
      title = (content.attributes as any).title;
    }
    return {
      params: {
        // eslint-disable-next-line no-underscore-dangle
        noteId: note._id.toString(),
        slug: slugify(title.replace('.md', '').toLowerCase()),
      },
    };
  });
  return { paths, fallback: 'blocking' };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { NEXT_PUBLIC_DECK_DOMAIN, GROUP_ID } = process.env;
  const { noteId } = params as unknown as any;
  const client = await logIn();

  const fullNote = await client.functions.callFunction('getNote', noteId);

  if (
    !fullNote ||
    (isSekundPublic(NEXT_PUBLIC_DECK_DOMAIN) && !fullNote.hasPublicLink)
  ) {
    return {
      props: {
        notFound: true,
      },
      revalidate: 10,
    };
  }

  const content = fm(fullNote.content);
  const readingStats = readingTime(content.body);
  const minutes = Math.round(readingStats.minutes);

  let title = fullNote.title.replace('.md', '');
  const atts = content.attributes as any;
  if (atts.title) {
    title = atts.title;
  }
  const { subtitle } = atts;

  const { imageUrl, description } = atts;
  const { body } = content;
  const notes: Note[] = await client.functions.callFunction(
    isSekundPublic(NEXT_PUBLIC_DECK_DOMAIN) ? 'publicNotes' : 'groupNotes',
    GROUP_ID
  );

  // const dom = htmlparser2.parseDocument(body);
  // const xmlBody = render(dom, {
  //   xmlMode: false,
  // });

  const mdxSource = await serialize(
    transformLinks(transformInclusions(body), notes),
    {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    }
  );

  const headerSource = await getHeaderSource(client, notes);

  return {
    props: {
      title,
      subtitle: subtitle || null,
      noteId: fullNote._id.toString(),
      userId: client.customData._id,
      source: mdxSource,
      date: fullNote.created,
      minutes,
      url: `https://${NEXT_PUBLIC_DECK_DOMAIN}/${fullNote._id.toString()}/${slugify(
        title.toLowerCase()
      )}`,
      atts,
      imageUrl: encodeURI(imageUrl) || null,
      description: description || null,
      twitterHandle: fullNote.user.twitterHandle || null,
      linkedInPage: fullNote.user.linkedInPage || null,
      personalPage: fullNote.user.personalPage || null,
      avatarImage: fullNote.user.image,
      userName: fullNote.user.name,
      headerSource: headerSource || null,
    },
    revalidate: 10,
  };
};
