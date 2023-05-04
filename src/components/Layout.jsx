import React from 'react';
import Head from 'next/head';
import SideNav from './SideNav';
import { LoginProvider } from "~/Contexts/LoginContext";
import { CanvasProvider } from '~/Contexts/canvasDrawerContext';
import Navbar from './Navbar';
import CanvasDrawer from './CanvasDrawer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { logout } from '../../store/Account/thunks';
import { useEffect } from 'react';


const Layout = ({ children, title }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const user = useSelector((state) => state.Account)
  const token = user.accessToken

  useEffect(() => {
    !token && router.push('/')
  }, [user])

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
          {user.accessToken && <button onClick={() => dispatch(logout(token))} className='text-black p-5 absolute right-5'><FontAwesomeIcon icon={faPowerOff} /> Logout</button>}
          <main className="min-h-screen w-full">{children}</main>
        </CanvasProvider>
      </div>
    </div>
  );
};

export default Layout;