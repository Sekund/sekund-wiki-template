import { DiscussionEmbed } from 'disqus-react';
import slugify from 'slugify';

const { WIKI_DOMAIN } = process.env;

type DisqusProps = {
  id: string;
  title: string;
};

const DisqusComments = ({ id, title }: DisqusProps) => {
  const disqusShortname = 'digital-society';
  const disqusConfig = {
    url: `${WIKI_DOMAIN}/${id}/${slugify(title)}`,
    identifier: id, // Single post id
    title, // Single post title
  };
  return (
    <div>
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </div>
  );
};

export default DisqusComments;
