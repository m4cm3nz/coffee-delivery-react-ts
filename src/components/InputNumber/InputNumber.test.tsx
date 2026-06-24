import { describe, it, expect, vi } from 'vitest'
import { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from 'styled-components'
import { InputNumber } from './index'
import { defaultTheme } from '../../styles/themes/default'

function renderInput(props: ComponentProps<typeof InputNumber>) {
  return render(
    <ThemeProvider theme={defaultTheme}>
      <InputNumber {...props} />
    </ThemeProvider>,
  )
}

describe('InputNumber', () => {
  it('shows the current value', () => {
    renderInput({ value: 3, onValueChange: vi.fn() })
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('increments and decrements within bounds', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    renderInput({ value: 3, onValueChange, min: 1, max: 9 })

    await user.click(screen.getByLabelText('Aumentar quantidade'))
    expect(onValueChange).toHaveBeenLastCalledWith(4)

    await user.click(screen.getByLabelText('Diminuir quantidade'))
    expect(onValueChange).toHaveBeenLastCalledWith(2)
  })

  it('disables decrement at the minimum when not removable', () => {
    renderInput({ value: 1, onValueChange: vi.fn(), min: 1 })
    expect(screen.getByLabelText('Diminuir quantidade')).toBeDisabled()
  })

  it('disables increment at the maximum', () => {
    renderInput({ value: 9, onValueChange: vi.fn(), max: 9 })
    expect(screen.getByLabelText('Aumentar quantidade')).toBeDisabled()
  })

  it('removes via the minus button at the minimum when onRemove is given', async () => {
    const user = userEvent.setup()
    const onRemove = vi.fn()
    const onValueChange = vi.fn()
    renderInput({ value: 1, onValueChange, onRemove, min: 1 })

    const removeButton = screen.getByLabelText('Remover item')
    expect(removeButton).toBeInTheDocument()
    expect(removeButton).toBeEnabled()

    await user.click(removeButton)
    expect(onRemove).toHaveBeenCalledTimes(1)
    expect(onValueChange).not.toHaveBeenCalled()
  })
})
