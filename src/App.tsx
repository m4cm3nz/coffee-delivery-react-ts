import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { OrderContextProvider } from './contexts/OrderContext'
import { Router } from './Router'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'
import { ErrorBoundary } from './components/ErrorBoundary'
import { ScrollToTop } from './components/ScrollToTop'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <ScrollToTop />
        <ErrorBoundary>
          <OrderContextProvider>
            <Router />
          </OrderContextProvider>
        </ErrorBoundary>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  )
}

export default App
