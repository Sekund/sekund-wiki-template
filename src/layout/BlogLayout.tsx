import React from 'react';

import { PostedNoteProps } from '@/components/NoteContents';
import BlogFooter from '@/layout/BlogFooter';
import BlogHeader from '@/layout/BlogHeader';

export default function BlogLayout(props: PostedNoteProps) {
  return (
    <div className="flex bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col w-full" style={{ minHeight: '100vh' }}>
        <BlogHeader {...props}></BlogHeader>
        <main
          className="flex justify-center flex-1 w-full"
          style={{ marginTop: '3.5rem' }}
        >
          {props.children}
        </main>
        <BlogFooter></BlogFooter>
      </div>
    </div>
  );
}
