import { useTranslation } from 'react-i18next';

import { LinkedInIcon } from '@/components/icons/LinkedInIcon';
import { TwitterIcon } from '@/components/icons/TwitterIcon';
import i18nConfig from '@/i18n.config';

type Props = {
  avatarImage?: string;
  userName?: string;
  twitterHandle?: string;
  linkedInPage?: string;
  title: string;
  date: number;
};

export default function PostMetadata({
  avatarImage,
  userName,
  twitterHandle,
  linkedInPage,
  title,
  date,
}: Props) {
  const { i18n } = useTranslation(['common'], { i18n: i18nConfig });
  return (
    <div>
      <h1 className="mb-2">
        <span className="block mt-2 text-gray-4 dark:text-white-4">
          {title}
        </span>
      </h1>
      <span className="text-md text-gray-4 dark:text-gray-1 flex items-center space-x-1">
        {avatarImage ? (
          <img
            className="inline-block h-10 w-10 rounded-full"
            src={avatarImage}
            alt="Avatar Image"
          />
        ) : null}
        {userName ? <span>{userName}</span> : null}
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
      </span>
    </div>
  );
}
