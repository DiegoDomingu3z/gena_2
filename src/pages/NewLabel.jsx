import React, { useEffect } from 'react'
import Login from '~/components/Login'
import { LoginProvider } from '~/Contexts/LoginContext'
import Layout from '~/components/Layout'
import NewLabel from '~/components/PrintShopView/NewLabel'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'

const newLabel = () => {
  const account = useSelector((state) => state.Account.account)
  const router = useRouter()
  useEffect(() => {
    if (account.privileges != 'admin') {
      router.push('/home')
    }
  }, [])
  return (
    <LoginProvider>
      <Layout title={"Gena | New Label"}>
        <NewLabel />
      </Layout>
    </LoginProvider>
  )
}

export default newLabel