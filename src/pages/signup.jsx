import React from 'react'
import { useEffect } from 'react';
import Layout from '~/components/Layout'
import Signup from '~/components/Signup';
import { LoginProvider } from '~/Contexts/LoginContext';

const signup = () => {

  return (
    <LoginProvider>
        <Layout title={"signup"}>
            <Signup />
        </Layout>
    </LoginProvider>
  )
}

export default signup