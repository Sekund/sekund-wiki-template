/* eslint-disable no-underscore-dangle */
import fm from 'front-matter';
import { GetStaticProps } from 'next';
import { serialize } from 'next-mdx-remote/serialize';
import DefaultErrorPage from 'next/error';
import Head from 'next/head';
import readingTime from 'reading-time';
import remarkGfm from 'remark-gfm';
import slugify from 'slugify';

import { transformInclusions, transformLinks } from '@/common/markdown-utils';
import { getHeaderSource, logIn } from '@/common/utils';
import BlogPostMetadata from '@/components/BlogPostMetadata';
import FeedbackCTA from '@/components/FeedbackCTA';
import NoteContents, { PostedNoteProps } from '@/components/NoteContents';
import SocialMetatags from '@/components/SocialMetatags';
import { Note } from '@/domain/Note';
import BlogLayout from '@/layout/BlogLayout';

export default function PastPost(props: PostedNoteProps) {
  return props.notFound ? (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <DefaultErrorPage statusCode={404} />
    </>
  ) : (
    <>
      <SocialMetatags
        title={props.title}
        description={props.description}
        imageUrl={props.imageUrl}
        url={props.url}
        userName={props.userName}
        twitterHandle={props.twitterHandle}
      />
      <BlogLayout {...props}>
        <div className="flex flex-col">
          {/** This is only to import some common styles in all pages */}
          <div className="hidden">
            <div className="text-lg"></div>
            <div className="text-sm"></div>
            <div className="text-xl"></div>
            <div className="text-2xl"></div>
            <div className="text-3xl"></div>
          </div>
          <NoteContents {...props}>
            <BlogPostMetadata
              {...{
                title: props.title,
                subtitle: props.subtitle,
                minutes: props.minutes,
                date: props.date,
                url: props.url,
              }}
            />
          </NoteContents>
          <FeedbackCTA {...{ noteId: props.noteId, title: props.title }} />
        </div>
      </BlogLayout>
    </>
  );
}

function isSekundPublic(domain: string | undefined): boolean {
  return domain === 'public.sekund.org';
}

export async function getStaticPaths() {
  const { NEXT_PUBLIC_DECK_DOMAIN, GROUP_ID } = process.env;
  const client = await logIn();
  const notes: Note[] = isSekundPublic(NEXT_PUBLIC_DECK_DOMAIN)
    ? []
    : await client.functions.callFunction('groupNotes', GROUP_ID);
  const paths = notes.map((note) => {
    const content = fm(note.content);
    let noteTitle = note.title.replace('.md', '').toLowerCase();
    if (content.attributes && (content.attributes as any).title) {
      noteTitle = (content.attributes as any).title;
    }
    return {
      params: {
        // eslint-disable-next-line no-underscore-dangle
        noteId: note._id.toString(),
        username: note.user.name || 'anonymous-coward',
        slug: slugify(noteTitle),
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
    (isSekundPublic(NEXT_PUBLIC_DECK_DOMAIN) && !fullNote.isPublished)
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
  const { subtitle, coverImage, description } = fullNote;
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
      imageUrl: coverImage ? encodeURI(coverImage) : null,
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
