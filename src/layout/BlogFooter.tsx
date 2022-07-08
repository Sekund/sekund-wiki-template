import React from 'react';

import Link from 'next/link';

import DarkModeToggle from '@/components/DarkModeToggle';

export default function Footer() {
  return (
    <div>
      <div className="bottom-0 z-10 flex items-center justify-between w-full h-8 max-w-6xl px-4 py-6 mx-auto mt-8 text-gray-900 border-t border-gray-300 dark:border-gray-700 lg:sticky dark:text-gray-50 bg-gray-50 dark:bg-gray-900">
        <DarkModeToggle />
        <div className="flex items-center space-x-2 overflow-hidden text-sm text-gray-700 dark:text-gray-100">
          <span className="flex-shrink-0 italic truncate">
            A blog powered by
          </span>
          <Link href="/">
            <a className="flex-shrink-0">
              <span className="sr-only">Sekund</span>
              <img
                className="w-auto h-8 sm:h-8"
                src="/assets/images/sekund-icon-color.png"
                alt="Sekund Collaborative Wiki"
              />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
