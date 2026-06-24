import { describe, it, expect, vi } from 'vitest'
import { ContextType } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from 'styled-components'
import { PaymentMethod } from './index'
import { OrderContext } from '../../../../contexts/OrderContext'
import { defaultTheme } from '../../../../styles/themes/default'

type ContextValue = ContextType<typeof OrderContext>

function renderPayment(overrides: Partial<ContextValue> = {}) {
  const value = {
    selectPaymentMethod: vi.fn(),
    paymentMethod: undefined,
    ...overrides,
  } as unknown as ContextValue

  render(
    <ThemeProvider theme={defaultTheme}>
      <OrderContext.Provider value={value}>
        <PaymentMethod />
      </OrderContext.Provider>
    </ThemeProvider>,
  )

  return value
}

describe('PaymentMethod', () => {
  it('renders three radio options', () => {
    renderPayment()
    expect(screen.getAllByRole('radio')).toHaveLength(3)
  })

  it('marks the currently selected method as checked', () => {
    renderPayment({ paymentMethod: 'debit' })
    expect(screen.getByRole('radio', { name: /débito/i })).toBeChecked()
    expect(screen.getByRole('radio', { name: /crédito/i })).not.toBeChecked()
  })

  it('selects a method when clicked', async () => {
    const user = userEvent.setup()
    const selectPaymentMethod = vi.fn()
    renderPayment({ selectPaymentMethod })

    await user.click(screen.getByRole('radio', { name: /dinheiro/i }))
    expect(selectPaymentMethod).toHaveBeenCalledWith('cash')
  })
})
