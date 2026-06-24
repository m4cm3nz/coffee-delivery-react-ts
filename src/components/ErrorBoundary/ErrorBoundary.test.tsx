import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { ErrorBoundary } from './index'
import { defaultTheme } from '../../styles/themes/default'

function Boom(): never {
  throw new Error('boom')
}

function renderBoundary(children: React.ReactNode) {
  return render(
    <ThemeProvider theme={defaultTheme}>
      <ErrorBoundary>{children}</ErrorBoundary>
    </ThemeProvider>,
  )
}

describe('ErrorBoundary', () => {
  it('renders a fallback alert when a child throws', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})

    renderBoundary(<Boom />)

    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByText('Algo deu errado')).toBeInTheDocument()

    spy.mockRestore()
  })

  it('renders children when there is no error', () => {
    renderBoundary(<p>conteúdo ok</p>)
    expect(screen.getByText('conteúdo ok')).toBeInTheDocument()
  })
})
