import { GetServerSidePropsContext } from 'next';
import { useState } from 'react';
import { AppProps } from 'next/app';
import { getCookie, setCookie } from 'cookies-next';
import Head from 'next/head';
import { MantineProvider, ColorScheme, ColorSchemeProvider, Button } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
// import Router from 'next/router';
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from 'next/router';
import useAuth from '../helper/useAuth';

import "../styles/global.css"

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookie('mantine-color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
  };
  const isLoggedIn = useAuth();
  const router = useRouter();
  console.log(router.pathname)
  if (router.pathname === '/' || router.pathname.includes('/forget-password') || isLoggedIn) {
    return (
      <>
        <Head>
          <title>TPI CLMS</title>
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
          <link rel="shortcut icon" href="/favicon.svg" />
          {/* <link rel="stylesheet" href="https://cdn.quilljs.com/1.3.4/quill.snow.css" />  */}

        </Head>

        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
          <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
            <NotificationsProvider  style={{ zIndex: 200000,top: 100 }} position="top-right"  >
              <Component {...pageProps} />
            </NotificationsProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </>
    );
  } else {
    return <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'center', alignItems: 'center', fontSize: '1rem' }}>
      <h1>403 |  Unauthorised</h1>
      <Button variant='outline' onClick={() => router.push('/')}>Login</Button></div>

  }

}

// App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
//   colorScheme: getCookie('mantine-color-scheme', ctx) || 'light',
// });
