import '../styles/globals.css'
import { ThemeProvider } from 'next-themes'
import { SessionProvider } from "next-auth/react"
import { TransactionsProvider } from '../src/contexts/TransactionsContext'


function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute='class'>
      <SessionProvider session={pageProps.session}>
        <TransactionsProvider>
          <Component {...pageProps} />
        </TransactionsProvider>
      </SessionProvider>
    </ThemeProvider>
  )
}

export default MyApp
