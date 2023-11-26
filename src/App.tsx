import { useRoutes } from 'react-router-dom'
import router from 'src/router'
import { SnackbarProvider } from 'notistack'
import { AuthProvider } from 'react-auth-kit'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'

import { CssBaseline } from '@mui/material'
import ThemeProvider from './theme/ThemeProvider'

function App() {
  const content = useRoutes(router)

  return (
    <AuthProvider authType="localstorage" authName={'_auth'}>
      <ThemeProvider>
        <SnackbarProvider maxSnack={3}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <CssBaseline />
            {content}
          </LocalizationProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}
export default App
