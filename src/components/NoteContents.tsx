/* eslint-disable no-underscore-dangle */
import React from 'react';

import { ExclamationIcon } from '@heroicons/react/solid';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { duotoneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import FeedbackCTA from '@/components/FeedbackCTA';
import { BrokenLink } from '@/components/links/BrokenLink';
import { ExternalLink } from '@/components/links/ExternalLink';
import { LeafLink } from '@/components/links/LeafLink';
import { SeedlingLink } from '@/components/links/SeedlingLink';
import { SeedLink } from '@/components/links/SeedLink';
import { WiltLink } from '@/components/links/WiltLink';

export type PostedNoteProps = {
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
  children?: React.ReactNode;
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
  source,
  noteId,
  userId,
  children: header,
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
              src={`https://sekund-sekund-dependencies.s3.amazonaws.com/${userId}/${noteId}/${image}`}
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
          src={`https://sekund-sekund-dependencies.s3.amazonaws.com/${userId}/${noteId}/${image}`}
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
            {header}
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
                FeedbackCTA,
                ExclamationIcon,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default PostedNote;
