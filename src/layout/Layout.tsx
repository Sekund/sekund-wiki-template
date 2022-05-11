import React from 'react';

import Footer from './Footer';
import Header from './Header';

type Props = {
  children: JSX.Element | undefined;
  title: JSX.Element;
};

export default function Layout({ children }: Props) {
  return (
    <div className="flex">
      <div className="flex flex-col w-full" style={{ minHeight: '100vh' }}>
        <Header></Header>
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
