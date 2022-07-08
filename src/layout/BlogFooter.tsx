import React from 'react';

import DarkModeToggle from '@/components/DarkModeToggle';

export default function Footer() {
  return (
    <div>
      <div className="bottom-0 z-10 flex items-center justify-around w-full h-8 max-w-6xl px-4 py-6 mx-auto mt-8 text-gray-900 border-t border-gray-300 dark:border-gray-700 lg:sticky dark:text-gray-50 bg-gray-50 dark:bg-gray-900">
        <DarkModeToggle />
      </div>
    </div>
  );
}
