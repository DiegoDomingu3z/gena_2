import React from 'react';
import Head from 'next/head';
import SideNav from './SideNav';
import { LoginProvider } from "~/Contexts/LoginContext";
import { CanvasProvider } from '~/Contexts/canvasDrawerContext';
import Navbar from './Navbar';
import CanvasDrawer from './CanvasDrawer';


const Layout = ({ children, title }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
        <div className='flex'>
          <CanvasProvider>
            <SideNav />
            <Navbar />
            <CanvasDrawer />
            <main className="min-h-screen w-full">{children}</main>
          </CanvasProvider>
        </div>
    </div>
  );
};

export default Layout;