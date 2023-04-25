import React from 'react'
import { useSelector } from 'react-redux'
import Layout from '~/components/Layout'
import { currentUser } from '../../store/userLogin'


const startNewOrder = () => {
  const userName = useSelector((state) => state)
  console.log(userName)
  return (
    <Layout title={"start-new-order"}>
        {/* {currentUser} */}
    </Layout>
  )
}

export default startNewOrder