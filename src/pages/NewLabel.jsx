import React from 'react'
import Login from '~/components/Login'
import { LoginProvider } from '~/Contexts/LoginContext'
import Layout from '~/components/Layout'
import NewLabel from '~/components/PrintShopView/NewLabel'

const newLabel = () => {
  return (
    <LoginProvider>
      <Layout title={"Gena | New Label"}>
        <NewLabel />
      </Layout>
    </LoginProvider>
  )
}

export default newLabel