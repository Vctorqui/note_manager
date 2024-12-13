import { ThemeProvider } from '@emotion/react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import theme from '../theme/theme'
import { Button, CssBaseline, useMediaQuery } from '@mui/material'
import './globals.css'
import { closeSnackbar, SnackbarProvider } from 'notistack'
import { Close } from '@mui/icons-material'

export const metadata = {
  title: 'Note Manager',
  description: 'Create and Manage your own notes',
}

export default function App({ Component, pageProps }: AppProps) {
  const isXs = useMediaQuery(theme.breakpoints.down('sm'))
  return (
    <>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
            vertical: isXs ? 'bottom' : 'top',
            horizontal: isXs ? 'right' : 'center',
          }}
          action={(snackbarId) => (
            <Button onClick={() => closeSnackbar(snackbarId)}>
              <Close sx={{ color: theme.palette.common.white }} />
            </Button>
          )}
        >
          <CssBaseline />
          <Head>
            <meta
              name='viewport'
              content='width=device-width, initial-scale=1'
            />
            <meta charSet='UTF-8' />
            <title>{metadata.title}</title>
            <meta name='description' content={metadata.description} />
          </Head>
          <Component {...pageProps} />
        </SnackbarProvider>
      </ThemeProvider>
    </>
  )
}
