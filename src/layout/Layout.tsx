import React from 'react';

import { MDXRemoteSerializeResult } from 'next-mdx-remote';

import Footer from '@/layout/Footer';

import Header from './Header';

type Props = {
  children: JSX.Element | undefined;
  headerSource?: MDXRemoteSerializeResult<Record<string, unknown>>;
};

export default function Layout({ children, headerSource }: Props) {
  return (
    <div className="flex bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col w-full" style={{ minHeight: '100vh' }}>
        <Header headerSource={headerSource}></Header>
        <main
          className="flex justify-center flex-1 w-full"
          style={{ marginTop: '3.5rem' }}
        >
          {children}
        </main>
        <Footer></Footer>
      </div>
    </div>
  );
}
