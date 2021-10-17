import '../styles/globals.css'
import { UserProvider } from '@auth0/nextjs-auth0';
import useSWR, { SWRConfig } from "swr";

const fetcher = (...args) => fetch(...args).then(res => res.json());

function MyApp({ Component, pageProps }) {
  return(
    <UserProvider>
      <SWRConfig value={{  refreshInterval: 1000 , fetcher }}>
          <Component {...pageProps} />
      </SWRConfig>
    </UserProvider>
  )
}

export default MyApp
