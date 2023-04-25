import React from 'react';
import Head from 'next/head';
import SideNav from './SideNav';
import { NavButtons } from './SideNav';

const Layout = ({ children, title }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <div className='flex'>
        <SideNav />
        <main className="min-h-screen">{children}</main>
      </div>
    </div>
  );
};

export default Layout;