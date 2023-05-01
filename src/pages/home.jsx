import React from 'react'
import HomeDashboard from '~/components/HomeDashboard'
import Layout from '~/components/Layout'
import { LoginProvider } from '~/Contexts/LoginContext'

const home = () => {
  return (
    <LoginProvider>
        <Layout title={"Gena | Home"}>
            <HomeDashboard />
        </Layout>
    </LoginProvider>
  )
}

export default home