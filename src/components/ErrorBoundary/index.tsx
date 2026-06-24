import { Component, ErrorInfo, ReactNode } from 'react'
import { ErrorContainer } from './styles'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Hook point for an error-reporting service (e.g. Sentry) in production.
    console.error('Unhandled UI error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer role="alert">
          <strong>Ops!</strong>
          <h1>Algo deu errado</h1>
          <p>Ocorreu um erro inesperado. Tente recarregar a página.</p>
          <button type="button" onClick={() => window.location.assign('/')}>
            Voltar ao início
          </button>
        </ErrorContainer>
      )
    }

    return this.props.children
  }
}
