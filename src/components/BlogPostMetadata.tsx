import { ClockIcon } from '@heroicons/react/outline';
import { t } from 'i18next';
import MarkdownIt from 'markdown-it';
import { useTranslation } from 'react-i18next';
import {
  FacebookIcon,
  TwitterIcon as TwitterShareIcon,
  LinkedinIcon,
  FacebookShareButton,
  LinkedinShareButton,
  EmailShareButton,
  EmailIcon,
  TwitterShareButton,
} from 'react-share';

import i18nConfig from '@/i18n.config';

type Props = {
  title: string;
  subtitle?: string;
  minutes?: number;
  date: number;
  url?: string;
};

export default function PostMetadata({
  title,
  subtitle,
  minutes,
  url,
  date,
}: Props) {
  const { i18n } = useTranslation(['common'], { i18n: i18nConfig });
  const md = new MarkdownIt();

  const ReadingTime = () =>
    minutes ? (
      <div className="inline-flex items-center pl-2 space-x-1 text-gray-600 dark:text-gray-400">
        <ClockIcon className="w-4 h-4" />
        <span>{t('readingTime', { val: minutes })}</span>
      </div>
    ) : null;

  return (
    <div className="block mb-8">
      <h1 className="mb-4">
        <span className="block mt-2 text-gray-4 dark:text-white-4">
          {title}
        </span>
      </h1>
      <div className="flex items-center space-x-2 text-md text-gray-4 dark:text-gray-1">
        <time className="text-gray-600 truncate dark:text-gray-400">
          {new Date(date).toLocaleDateString(i18n.language, {
            month: 'long',
            day: 'numeric',
            year: '2-digit',
          })}
        </time>
        {minutes ? (
          <span className="items-center hidden md:inline-flex">
            <span>•</span>
            <ReadingTime />
          </span>
        ) : null}
      </div>
      <h2 className="sekund-subtitle">
        <span
          dangerouslySetInnerHTML={{ __html: md.renderInline(subtitle || '') }}
        ></span>
      </h2>
      {url ? (
        <div className="flex space-x-1">
          <FacebookShareButton url={url}>
            <FacebookIcon round size="2rem" />
          </FacebookShareButton>
          <LinkedinShareButton url={url}>
            <LinkedinIcon round size="2rem" />
          </LinkedinShareButton>
          <EmailShareButton url={url}>
            <EmailIcon round size="2rem" />
          </EmailShareButton>
          <TwitterShareButton url={url}>
            <TwitterShareIcon round size="2rem" />
          </TwitterShareButton>
          <span className="md:hidden">
            <ReadingTime />
          </span>
        </div>
      ) : null}
    </div>
  );
}
