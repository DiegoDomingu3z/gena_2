import React from 'react';
import Head from 'next/head';
import SideNav from './SideNav';
import { LoginProvider } from "~/Contexts/LoginContext";


const Layout = ({ children, title }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <div className='flex'>
        <LoginProvider>
          <SideNav />
          <main className="min-h-screen w-full">{children}</main>
        </LoginProvider>
      </div>
    </div>
  );
};

export default Layout;