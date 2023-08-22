import React, { useEffect } from 'react'
import Login from '~/components/Login'
import { LoginProvider } from '~/Contexts/LoginContext'
import Layout from '~/components/Layout'
import NewLabel from '~/components/PrintShopView/NewLabel'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'

const NewLabel = () => {
  const account = useSelector((state) => state.Account.account)
  const router = useRouter()
  useEffect(() => {
    if (account.privileges != 'admin') {
      router.push('/start-new-order')
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

export default NewLabel