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

import { LinkedInIcon } from '@/components/icons/LinkedInIcon';
import { TwitterIcon } from '@/components/icons/TwitterIcon';
import i18nConfig from '@/i18n.config';

type Props = {
  avatarImage?: string;
  userName?: string;
  twitterHandle?: string;
  linkedInPage?: string;
  personalPage?: string;
  title: string;
  subtitle?: string;
  date: number;
  url?: string;
};

export default function PostMetadata({
  avatarImage,
  userName,
  twitterHandle,
  linkedInPage,
  personalPage,
  title,
  subtitle,
  url,
  date,
}: Props) {
  const { i18n } = useTranslation(['common'], { i18n: i18nConfig });
  return (
    <div className="block mb-8">
      <h1 className="mb-4">
        <span className="block mt-2 text-gray-4 dark:text-white-4">
          {title}
        </span>
      </h1>
      <div className="text-md text-gray-4 dark:text-gray-1 flex items-center space-x-2">
        {avatarImage ? (
          <img
            className="inline-block h-10 w-10 rounded-full"
            style={{ margin: 0 }}
            src={avatarImage}
            alt="Avatar Image"
          />
        ) : null}
        {userName ? (
          <div className="overflow-hidden truncate">
            {personalPage ? (
              <a href={personalPage} target="_blank" rel="noreferrer">
                {userName}
              </a>
            ) : (
              <span>{userName}</span>
            )}
          </div>
        ) : null}
        {twitterHandle ? <TwitterIcon handle={twitterHandle} /> : null}
        {linkedInPage ? <LinkedInIcon href={linkedInPage} /> : null}
        <span>{' • '}</span>

        <time className="text-gray-600 truncate">
          {new Date(date).toLocaleDateString(i18n.language, {
            month: 'long',
            day: 'numeric',
            year: '2-digit',
          })}
        </time>
      </div>
      <h2 className="sekund-subtitle">{subtitle}</h2>
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
        </div>
      ) : null}
    </div>
  );
}
