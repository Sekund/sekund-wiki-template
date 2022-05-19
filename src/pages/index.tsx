/* eslint-disable no-underscore-dangle */
import fm from 'front-matter';
import { GetStaticProps } from 'next';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import Link from 'next/link';
import slugify from 'slugify';

import PostMetadata from '@/components/PostMetadata';
import Layout from '@/layout/Layout';

import { transformLinks } from '../common/markdown-utils';
import { logIn } from '../common/utils';
import { BrokenLink } from '../components/links/BrokenLink';
import { ExternalLink } from '../components/links/ExternalLink';
import { LeafLink } from '../components/links/LeafLink';
import { SeedlingLink } from '../components/links/SeedlingLink';
import { SeedLink } from '../components/links/SeedLink';
import { WiltLink } from '../components/links/WiltLink';
import { Note } from '../domain/Note';
import { AppConfig } from '../utils/AppConfig';

const { WIKI_DOMAIN, GROUP_ID } = process.env;

type NoteProps = {
  imageUrl: string;
  category: string;
  title: string;
  description: string;
  source: MDXRemoteSerializeResult;
  url: string;
  noteId: string;
  userId: string;
  date: number;
  avatarImage?: string;
  userName?: string;
  twitterHandle?: string;
  linkedInPage?: string;
};

const components = {
  Link,
  SeedLink,
  SeedlingLink,
  LeafLink,
  WiltLink,
  BrokenLink,
  ExternalLink,
};

export function Card({
  source,
  userName,
  avatarImage,
  date,
  title,
  twitterHandle,
  linkedInPage,
}: NoteProps) {
  return (
    <div className="relative flex flex-col items-center px-4 mx-auto sm:justify-center grow">
      <div
        className="prose prose-lg lg:prose-lg dark:prose-invert"
        style={{ maxWidth: '65ch' }}
      >
        <PostMetadata
          {...{
            title,
            userName,
            avatarImage,
            date,
            twitterHandle,
            linkedInPage,
          }}
        />
        <MDXRemote {...source} components={components} />
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const client = await logIn();
  const fullNote = await client.functions.callFunction(
    'getNoteByPath',
    AppConfig.index_page
  );
  const content = fm(fullNote.content);

  const { body } = content;
  const notes: Note[] = await client.functions.callFunction(
    'groupNotes',
    GROUP_ID
  );
  const atts = content.attributes as any;
  let title = fullNote.title.replace('.md', '');
  if (atts.title) {
    title = atts.title;
  }
  const mdxSource = await serialize(transformLinks(body, notes));
  return {
    props: {
      title,
      noteId: fullNote._id.toString(),
      userId: client.customData._id,
      source: mdxSource,
      url: `${WIKI_DOMAIN}/${fullNote._id.toString()}/${slugify(title)}`,
      date: fullNote.created,
      twitterHandle: fullNote.user.twitterHandle || null,
      linkedInPage: fullNote.user.linkedInPage || null,
      avatarImage: fullNote.user.image,
      userName: fullNote.user.name,
    },
    revalidate: 10,
  };
};

export default function HubPage(props: NoteProps) {
  return (
    <Layout>
      <Card {...props} />
    </Layout>
  );
}
