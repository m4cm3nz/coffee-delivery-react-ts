import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { Login } from './index'
import { AuthProvider } from '../../contexts/AuthContext'
import { defaultTheme } from '../../styles/themes/default'

function renderLogin() {
  return render(
    <ThemeProvider theme={defaultTheme}>
      <MemoryRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </MemoryRouter>
    </ThemeProvider>,
  )
}

beforeEach(() => {
  localStorage.clear()
})

describe('Login', () => {
  it('shows a validation error for an invalid e-mail', async () => {
    const user = userEvent.setup()
    renderLogin()

    await user.type(screen.getByLabelText('E-mail'), 'not-an-email')
    await user.type(screen.getByLabelText('Senha'), 'secret')
    await user.click(screen.getByRole('button', { name: 'Entrar' }))

    expect(
      await screen.findByText('Informe um e-mail válido'),
    ).toBeInTheDocument()
    expect(localStorage.getItem('@coffee-delivery:session')).toBeNull()
  })

  it('logs in and persists the session with valid credentials', async () => {
    const user = userEvent.setup()
    renderLogin()

    await user.type(screen.getByLabelText('E-mail'), 'maria@example.com')
    await user.type(screen.getByLabelText('Senha'), 'secret')
    await user.click(screen.getByRole('button', { name: 'Entrar' }))

    await waitFor(() =>
      expect(localStorage.getItem('@coffee-delivery:session')).not.toBeNull(),
    )
  })
})
