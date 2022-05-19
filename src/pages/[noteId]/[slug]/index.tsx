/* eslint-disable no-underscore-dangle */
import React, { useContext } from 'react';

import fm from 'front-matter';
import { Embed } from 'hyvor-talk-react';
import { GetStaticProps } from 'next';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import Head from 'next/head';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { duotoneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import readingTime from 'reading-time';
import slugify from 'slugify';

import { LinkedInIcon } from '@/components/icons/LinkedInIcon';
import { TwitterIcon } from '@/components/icons/TwitterIcon';
import { DarkModeContext } from '@/components/ThemedApp';
import i18nConfig from '@/i18n.config';
import Layout from '@/layout/Layout';

import {
  transformInclusions,
  transformLinks,
} from '../../../common/markdown-utils';
import { logIn } from '../../../common/utils';
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
  description: string;
  author: string;
  source: MDXRemoteSerializeResult<Record<string, unknown>>;
  date: number;
  rTime: string;
  url: string;
  noteId: string;
  userId: string;
  avatarImage?: string;
  userName?: string;
  twitterHandle?: string;
  linkedInPage?: string;
  HYVOR_TALK_WEBSITE_ID: number;
};

type CodeProps = {
  className: string;
} & React.HTMLAttributes<HTMLPreElement>;

type DependencyProps = {
  src: string;
};

export function PostedNote({
  title,
  description,
  url,
  imageUrl,
  twitterHandle,
  source,
  date,
  noteId,
  userId,
  avatarImage,
  userName,
  linkedInPage,
  HYVOR_TALK_WEBSITE_ID,
}: PostedNoteProps) {
  const darkPalette = {
    accent: '#f9fafb',
    accentText: '#000',
    footerHeader: 'rgb(26 32 44)',
    footerHeaderText: '#cac7c7',
    box: 'rgb(26 32 44)',
    boxText: '#f9fafb',
    boxLightText: '#aaaaaa',
    backgroundText: '#ffffff',
  };
  const lightPalette = {
    accent: '#1a202c',
    accentText: '#f9fafb',
    footerHeader: '#f9fafb',
    footerHeaderText: '#4a5568',
    box: '#f9fafb',
    boxText: '#4a5568',
    boxLightText: '#aaaaaa',
    backgroundText: '#ffffff',
  };
  const { i18n } = useTranslation(['common'], { i18n: i18nConfig });
  const { darkMode } = useContext(DarkModeContext);

  const Inclusion = ({ src }: DependencyProps) => {
    if (src.match(/(.)*(.jpg|.jpeg|.gif|.png)/)) {
      return (
        <img
          alt="image"
          src={`https://sekund-sekund-dependencies.s3.amazonaws.com/${userId}/${noteId}/assets/${src}`}
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
      <div className="py-8 overflow-hidden bg-white-4 dark:bg-gray-4">
        <div className="sekund-content">
          <div className="mx-auto prose prose-lg dark:prose-invert max-w-prose sekund-header">
            <h1 className="mb-2">
              <span className="block mt-2 text-gray-4 dark:text-white-4">
                {title}
              </span>
            </h1>
            <span className="text-md text-gray-4 dark:text-gray-1 flex items-center space-x-1">
              {avatarImage ? (
                <img
                  className="inline-block h-10 w-10 rounded-full"
                  src={avatarImage}
                  alt="Avatar Image"
                />
              ) : null}
              {userName ? <span>{userName}</span> : null}
              {twitterHandle ? <TwitterIcon handle={twitterHandle} /> : null}
              {linkedInPage ? <LinkedInIcon href={linkedInPage} /> : null}
              <span>{' • '}</span>

              <time className="text-gray-600 truncate">
                {new Date(date).toLocaleDateString(i18n.language, {
                  month: 'long',
                  day: 'numeric',
                  year: '2-digit',
                })}
              </time>
            </span>
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
    );
  }

  return (
    <>
      <SocialMetatags />
      <Layout>
        <div className="flex flex-col">
          <Content />
          {HYVOR_TALK_WEBSITE_ID ? (
            <div className="p-2">
              <Embed
                websiteId={HYVOR_TALK_WEBSITE_ID}
                id={noteId}
                title={title}
                palette={darkMode ? darkPalette : lightPalette}
                language={i18n.language}
              />
            </div>
          ) : null}
        </div>
      </Layout>
    </>
  );
}

export default PostedNote;

export async function getStaticPaths() {
  const { GROUP_ID } = process.env;
  const client = await logIn();
  const notes: Note[] = await client.functions.callFunction(
    'groupNotes',
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
        slug: slugify(title.replace('.md', '')),
      },
    };
  });
  return { paths, fallback: 'blocking' };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { WIKI_DOMAIN, GROUP_ID, HYVOR_TALK_WEBSITE_ID } = process.env;
  const { noteId } = params as unknown as any;
  const client = await logIn();

  const fullNote = await client.functions.callFunction('getNote', noteId);
  const content = fm(fullNote.content);
  const readingStats = readingTime(content.body);
  const minutes = Math.round(readingStats.minutes);
  const rTime = `${minutes > 1 ? `${minutes} minutes` : 'less than a minute'}`;

  let title = fullNote.title.replace('.md', '');
  const atts = content.attributes as any;
  if (atts.title) {
    title = atts.title;
  }

  const { imageUrl, description } = atts;
  const { body } = content;
  const notes: Note[] = await client.functions.callFunction(
    'groupNotes',
    GROUP_ID
  );

  const mdxSource = await serialize(
    transformLinks(transformInclusions(body), notes)
  );
  return {
    props: {
      title,
      noteId: fullNote._id.toString(),
      userId: client.customData._id,
      source: mdxSource,
      date: fullNote.created,
      rTime,
      url: `${WIKI_DOMAIN}/${fullNote._id.toString()}/${slugify(title)}`,
      atts,
      imageUrl: encodeURI(imageUrl) || null,
      description: description || null,
      HYVOR_TALK_WEBSITE_ID,
      twitterHandle: fullNote.user.twitterHandle || null,
      linkedInPage: fullNote.user.linkedInPage || null,
      avatarImage: fullNote.user.image,
      userName: fullNote.user.name,
    },
    revalidate: 10,
  };
};
