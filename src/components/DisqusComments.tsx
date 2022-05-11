import { DiscussionEmbed } from 'disqus-react';
import slugify from 'slugify';

type DisqusProps = {
  id: string;
  title: string;
};

const DisqusComments = ({ id, title }: DisqusProps) => {
  const { WIKI_DOMAIN } = process.env;
  console.log(
    'disqus comments',
    id,
    title,
    `${WIKI_DOMAIN}/${id}/${slugify(title)}`
  );
  const disqusShortname = 'digital-society';
  const disqusConfig = {
    url: `${WIKI_DOMAIN}/${id}/${slugify(title)}`,
    identifier: id, // Single post id
    title, // Single post title
    language: 'fr',
  };
  return <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />;
};

export default DisqusComments;
