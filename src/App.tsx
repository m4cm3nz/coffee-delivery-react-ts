import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { OrderContextProvider } from './contexts/OrderContext'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { Router } from './Router'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'
import { ErrorBoundary } from './components/ErrorBoundary'
import { ScrollToTop } from './components/ScrollToTop'
import { Loading } from './components/Loading'
import { GUEST_ID } from './util/cartStorage'

function AuthedApp() {
  const { user, status } = useAuth()

  if (status === 'loading') {
    return <Loading />
  }

  const userId = user?.id ?? GUEST_ID

  // Keying by user remounts the cart provider on login/logout, so each user's
  // scoped storage is loaded cleanly.
  return (
    <OrderContextProvider key={userId} userId={userId}>
      <Router />
    </OrderContextProvider>
  )
}

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <ScrollToTop />
        <ErrorBoundary>
          <AuthProvider>
            <AuthedApp />
          </AuthProvider>
        </ErrorBoundary>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  )
}

export default App
