/* eslint-disable no-underscore-dangle */
import React from 'react';

import fm from 'front-matter';
import { GetStaticProps } from 'next';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import Link from 'next/link';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { duotoneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import readingTime from 'reading-time';
import slugify from 'slugify';

import DisqusComments from '@/components/DisqusComments';
import Layout from '@/layout/Layout';

import { transformLinks } from '../../../common/markdown-utils';
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
  source: MDXRemoteSerializeResult<Record<string, unknown>>;
  date: string;
  datetime: string;
  rTime: string;
  url: string;
  noteId: string;
  userId: string;
};

const { WIKI_DOMAIN, GROUP_ID } = process.env;

type CodeProps = {
  className: string;
} & React.HTMLAttributes<HTMLPreElement>;

type DependencyProps = {
  src: string;
};

export function PostedNote({
  title,
  source,
  date,
  datetime,
  noteId,
  userId,
}: PostedNoteProps) {
  const Inclusion = ({ src }: DependencyProps) => {
    if (src.match(/(.)*(.jpg|.jpeg|.gif|.png)/)) {
      return (
        <img
          alt="some image"
          src={`https://sekund-sekund-dependencies.s3.amazonaws.com/${userId}/${noteId}/${src}`}
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
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto prose prose-lg dark:prose-invert max-w-prose">
            <h1 className="mb-2">
              <span className="block mt-2 text-gray-4 dark:text-white-4">
                {title}
              </span>
            </h1>
            <span className="text-md text-gray-4 dark:text-gray-1">
              <time className="text-gray-600 truncate" dateTime={datetime}>
                {date}
              </time>{' '}
              {/* • {rTime} */}
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
    <Layout>
      <div className="flex flex-col">
        <Content />
        <DisqusComments id={noteId} title={title} wikiDomain={WIKI_DOMAIN} />
      </div>
    </Layout>
  );
}

export default PostedNote;

export async function getStaticPaths() {
  const client = await logIn();
  const notes: Note[] = await client.functions.callFunction(
    'publishedNotes',
    'sdtsi'
  );
  const paths = notes.map((note) => {
    return {
      params: {
        // eslint-disable-next-line no-underscore-dangle
        id: note._id.toString(),
        slug: slugify(note.title.replace('.md', '')),
      },
    };
  });
  return { paths, fallback: 'blocking' };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { noteId } = params as unknown as any;
  const client = await logIn();
  const fullNote = await client.functions.callFunction('getNote', noteId);
  const content = fm(fullNote.content);
  const readingStats = readingTime(content.body);
  const minutes = Math.round(readingStats.minutes);
  const rTime = `${minutes > 1 ? `${minutes} minutes` : 'less than a minute'}`;
  let title = fullNote.title.replace('.md', '');
  if (content.attributes && (content.attributes as any).title) {
    title = (content.attributes as any).title;
  }
  const { body } = content;
  const notes: Note[] = await client.functions.callFunction(
    'groupNotes',
    GROUP_ID
  );

  const mdxSource = await serialize(transformLinks(body, notes));
  return {
    props: {
      title,
      noteId: fullNote._id.toString(),
      userId: client.customData._id,
      source: mdxSource,
      date: `${new Date(fullNote.created).toDateString()}`,
      datetime: new Date(fullNote.created).toISOString().split('T')[0],
      rTime,
      url: `${WIKI_DOMAIN}/${fullNote._id.toString()}/${slugify(title)}`,
      atts: content.attributes,
    },
    revalidate: 10,
  };
};
