import '@/styles/globals.css'
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material'
import type { AppProps } from 'next/app'
import { darkTheme } from '@/themes'
import { UIProvider } from '@/context/ui'
import { EntriesProvider } from '@/context/entries'





export default function App({ Component, pageProps }: AppProps) {



  return (
    <EntriesProvider>
       <UIProvider>
      <ThemeProvider theme={darkTheme}>

        <CssBaseline />
        <Component {...pageProps} />

      </ThemeProvider>
    </UIProvider>
    </EntriesProvider>
   
  )
}
