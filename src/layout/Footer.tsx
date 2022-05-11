import React from 'react';

import { HomeIcon, UsersIcon } from '@heroicons/react/solid';
import Link from 'next/link';

function iconLink(icon: JSX.Element, href: string) {
  return (
    <Link href={href}>
      <a>{icon}</a>
    </Link>
  );
}

export default function Footer() {
  return (
    <div className="sticky bottom-0 left-0 right-0 z-10 flex items-center justify-around w-full h-8 px-4 py-6 text-gray-200 bg-gray-800">
      {iconLink(<HomeIcon className="w-6 h-6" />, '/home')}
      {iconLink(<UsersIcon className="w-6 h-6" />, '/peoples')}
    </div>
  );
}
