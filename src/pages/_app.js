import { Provider } from 'react-redux'
import '~/styles/globals.css'
import { LoginProvider } from '~/Contexts/LoginContext'
import { store } from '../../store'

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <LoginProvider>
        <Component {...pageProps} />
      </LoginProvider>
    </Provider>
  )
}
