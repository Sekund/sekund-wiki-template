import { DiscussionEmbed } from 'disqus-react';
import slugify from 'slugify';

import { AppConfig } from '@/utils/AppConfig';

type DisqusProps = {
  id: string;
  title: string;
};

const DisqusComments = ({ id, title }: DisqusProps) => {
  const disqusShortname = 'digital-society';
  const disqusConfig = {
    url: `${AppConfig.wiki_domain}/${id}/${slugify(title)}`,
    identifier: id, // Single post id
    title, // Single post title
    language: 'fr',
  };
  return <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />;
};

export default DisqusComments;
