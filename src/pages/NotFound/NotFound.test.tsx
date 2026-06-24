import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { NotFound } from './index'
import { defaultTheme } from '../../styles/themes/default'

describe('NotFound', () => {
  it('renders the 404 message and a link back home', () => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <MemoryRouter>
          <NotFound />
        </MemoryRouter>
      </ThemeProvider>,
    )

    expect(screen.getByText('404')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /início/i })).toHaveAttribute(
      'href',
      '/',
    )
  })
})
