import React from 'react';

import { MDXRemoteSerializeResult } from 'next-mdx-remote';

import BlogFooter from '@/layout/BlogFooter';
import BlogHeader from '@/layout/BlogHeader';

type Props = {
  children: JSX.Element | undefined;
  headerSource?: MDXRemoteSerializeResult<Record<string, unknown>>;
};

export default function Layout({ children, headerSource }: Props) {
  return (
    <div className="flex bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col w-full" style={{ minHeight: '100vh' }}>
        <BlogHeader headerSource={headerSource}></BlogHeader>
        <main
          className="flex justify-center flex-1 w-full"
          style={{ marginTop: '3.5rem' }}
        >
          {children}
        </main>
        <BlogFooter></BlogFooter>
      </div>
    </div>
  );
}
