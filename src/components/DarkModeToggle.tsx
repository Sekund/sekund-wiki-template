/* This example requires Tailwind CSS v2.0+ */
import React, { useContext } from 'react';

import { Switch } from '@headlessui/react';

import { applyDarkMode } from '@/common/darkMode';
import { classNames } from '@/common/tailwind';
import { DarkModeContext } from '@/components/ThemedApp';

type Props = {
  noLabel?: boolean;
  className?: string;
};

export default function NightModeToggle({ noLabel, className }: Props) {
  const { setDarkMode, darkMode } = useContext(DarkModeContext);
  // const { t } = useTranslation("common");

  function toggleDarkMode(d: boolean) {
    setDarkMode(d);
    applyDarkMode(d);
  }

  return (
    <div
      className={`${className || ''} flex items-center space-x-2 lg:ml-2 ${
        noLabel ? '' : ''
      }`}
    >
      <span
        className={`lg:hidden text-gray-900 dark:text-gray-200 ${
          noLabel ? 'hidden' : ''
        }`}
      >
        Theme:
      </span>
      <Switch
        checked={darkMode}
        onChange={() => {
          toggleDarkMode(!darkMode);
        }}
        className="relative inline-flex flex-shrink-0 h-6 transition-colors duration-200 ease-in-out border border-gray-300 rounded-full cursor-pointer dark:border-gray-600 bg-secondary w-11 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
      >
        <span className="sr-only">Use setting</span>
        <span
          className={classNames(
            darkMode
              ? 'translate-x-5 bg-gray-700 '
              : 'translate-x-0 bg-gray-50 ',
            'pointer-events-none relative inline-block h-5 w-5 rounded-full shadow transform ring-0 transition ease-in-out duration-200'
          )}
        >
          <span
            className={classNames(
              darkMode
                ? 'opacity-0 ease-out duration-100'
                : 'opacity-100 ease-in duration-200',
              'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity'
            )}
            aria-hidden="true"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="darkgray"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </span>
          <span
            className={classNames(
              darkMode
                ? 'opacity-100 ease-in duration-200 text-gray-700'
                : 'opacity-0 ease-out duration-100',
              'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity'
            )}
            aria-hidden="true"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="yellow"
              viewBox="0 0 24 24"
              stroke="yellow"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={0}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          </span>
        </span>
      </Switch>
    </div>
  );
}
