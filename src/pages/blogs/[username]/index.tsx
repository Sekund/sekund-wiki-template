/* eslint-disable no-underscore-dangle */
import fm from 'front-matter';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import readingTime from 'reading-time';
import slugify from 'slugify';

import { logIn, recursivelyConvertObjectIdsToStrings } from '@/common/utils';
import { LinkedInIcon } from '@/components/icons/LinkedInIcon';
import { TwitterIcon } from '@/components/icons/TwitterIcon';
import SocialMetatags from '@/components/SocialMetatags';
import { Note } from '@/domain/Note';
import i18nConfig from '@/i18n.config';
import BlogFooter from '@/layout/BlogFooter';

type Props = {
  user: {
    image: string;
    name: string;
    bio?: string;
    twitterHandle?: string;
    linkedInPage?: string;
  };
  posts: {
    imageUrl: string;
    title: string;
    href: string;
    avatarImageUrl: string;
    description: string;
    minutes: string;
    date: number;
  }[];
};

export default function BlogIndex({ posts, user }: Props) {
  const { i18n } = useTranslation(['common'], { i18n: i18nConfig });

  function Contents() {
    return (
      <div className="relative px-4 pt-16 pb-20 text-gray-700 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8 text-md dark:text-gray-100">
        <div className="absolute inset-0">
          <div className="h-1/3 sm:h-2/3" />
        </div>
        <div className="relative max-w-5xl mx-auto">
          <div className="flex justify-center text-center">
            <img
              className="w-20 h-20 rounded-full"
              src={user.image}
              alt={`Avatar image of ${user.name}`}
            />
          </div>
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              {user.name}
            </h2>
            <div className="flex items-center justify-center space-x-2 text-gray-700 dark:text-gray-100">
              {user.twitterHandle ? (
                <TwitterIcon handle={user.twitterHandle} />
              ) : null}
              {user.linkedInPage ? (
                <LinkedInIcon href={user.linkedInPage} />
              ) : null}
            </div>
            <p className="max-w-2xl mx-auto mt-3 text-xl sm:mt-4 ">
              {user.bio}
            </p>
          </div>
          <div className="grid max-w-lg gap-5 mx-auto mt-12 lg:grid-cols-3 lg:max-w-none">
            {posts.map((post) => (
              <div
                key={post.title}
                className="flex flex-col overflow-hidden rounded-lg shadow-lg"
              >
                <div className="flex-shrink-0">
                  <Link href={post.href}>
                    <a>
                      <img
                        className="object-cover w-full h-48"
                        src={post.imageUrl}
                        alt=""
                      />
                    </a>
                  </Link>
                </div>
                <div className="flex flex-col justify-between flex-1 p-6">
                  <div className="flex-1">
                    <Link href={post.href}>
                      <a className="block mt-2">
                        <p className="text-xl font-semibold">{post.title}</p>
                        <p className="text-base">
                          {new Date(post.date).toLocaleDateString(
                            i18n.language,
                            {
                              month: 'long',
                              day: 'numeric',
                              year: '2-digit',
                            }
                          )}
                        </p>
                        <p className="mt-3 text-base text-gray-600 text-md dark:text-gray-400">
                          {post.description}
                        </p>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SocialMetatags
        title={`Candide Kemmler's Blog`}
        description={`Candide Kemmler's Blog`}
        imageUrl={``}
        url={``}
        userName={``}
        twitterHandle={``}
      />
      <div className="flex bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col w-full" style={{ minHeight: '100vh' }}>
          <main
            className="flex justify-center flex-1 w-full"
            style={{ marginTop: '3.5rem' }}
          >
            <Contents />
          </main>
          <BlogFooter></BlogFooter>
        </div>
      </div>
    </>
  );
}

function unslugify(slug: string) {
  const result = slug.replace(/-/g, ' ');
  return result.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export async function getStaticPaths() {
  return { paths: [], fallback: 'blocking' };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { username } = params as unknown as any;
  const client = await logIn();

  const unslugged = unslugify(username);

  const userBlogPosts = await client.functions.callFunction(
    'userBlogPosts',
    unslugged
  );

  const { posts, user } = recursivelyConvertObjectIdsToStrings(userBlogPosts);

  return {
    props: {
      user,
      posts: posts.map((fullNote: Note) => {
        const content = fm(fullNote.content);
        const readingStats = readingTime(content.body);
        const minutes = Math.round(readingStats.minutes);
        let title = fullNote.title.replace('.md', '');
        const date = fullNote.created;
        const atts = content.attributes as any;
        if (atts.title) {
          title = atts.title;
        }
        const { subtitle } = atts;

        const { imageUrl, description } = atts;
        return {
          ...fullNote,
          _id: fullNote._id.toString(),
          userId: fullNote.userId.toString(),
          href: `/blogs/${username}/posts/${fullNote._id.toString()}/${slugify(
            title
          )}`,
          date,
          subtitle: subtitle || '',
          imageUrl: imageUrl || '',
          description: description || 'description',
          minutes,
          title,
        };
      }),
    },
    revalidate: 10,
  };
};
