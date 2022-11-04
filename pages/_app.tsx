import "../styles/global.scss";
import type { AppProps } from "next/app";
import { RouteGuard } from '../components/utils/route-groud';
import Head from 'next/head';
import { Container } from '@mui/system';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>My FoodDB</title>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <Container sx={{paddingTop: "100px"}}>
        <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover={false}
          theme="light"
        />
        <RouteGuard>
          <Component {...pageProps} />
        </RouteGuard>
      </Container>
    </>
  )
}

export default MyApp;
