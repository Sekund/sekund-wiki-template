import { DiscussionEmbed } from 'disqus-react';
import slugify from 'slugify';

type DisqusProps = {
  id: string;
  title: string;
  wikiDomain: string | undefined;
};

const DisqusComments = ({ id, title, wikiDomain }: DisqusProps) => {
  console.log(
    'disqus comments',
    id,
    title,
    `${wikiDomain}/${id}/${slugify(title)}`
  );
  const disqusShortname = 'digital-society';
  const disqusConfig = {
    url: `${wikiDomain}/${id}/${slugify(title)}`,
    identifier: id, // Single post id
    title, // Single post title
    language: 'fr',
  };
  return <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />;
};

export default DisqusComments;
