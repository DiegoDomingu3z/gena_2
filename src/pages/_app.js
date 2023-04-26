import { Provider } from 'react-redux'
import { store } from '../../store/store'
import '~/styles/globals.css'
import { LoginProvider } from '~/Contexts/LoginContext'

export default function App({ Component, pageProps }) {
  return (
    <Component {...pageProps} />
  )
}
