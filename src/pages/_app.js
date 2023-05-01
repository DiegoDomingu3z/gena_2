import { Provider } from 'react-redux'
import '~/styles/globals.css'
import { LoginProvider } from '~/Contexts/LoginContext'

export default function App({ Component, pageProps }) {
  return (
    <LoginProvider>
      <Component {...pageProps} />
    </LoginProvider>
  )
}
