import { Minus, Plus, Trash } from '@phosphor-icons/react'
import { AmountInput } from './styles'

type InputNumberProps = {
  value: number
  onValueChange: (value: number) => void
  min?: number
  max?: number
  /**
   * When provided, pressing "−" at the minimum value removes the item
   * instead of being a no-op, and the button shows a trash icon.
   */
  onRemove?: () => void
}

export function InputNumber({
  value,
  onValueChange,
  min = 1,
  max = 99,
  onRemove,
}: InputNumberProps) {
  const atMin = value <= min
  const showRemove = atMin && !!onRemove

  function handleDecrease() {
    if (value > min) {
      onValueChange(value - 1)
    } else if (onRemove) {
      onRemove()
    }
  }

  function handleIncrease() {
    if (value < max) onValueChange(value + 1)
  }

  return (
    <AmountInput>
      <button
        type="button"
        onClick={handleDecrease}
        disabled={atMin && !onRemove}
        data-danger={showRemove}
        aria-label={showRemove ? 'Remover item' : 'Diminuir quantidade'}
      >
        {showRemove ? (
          <Trash size={14} weight="bold" />
        ) : (
          <Minus size={14} weight="bold" />
        )}
      </button>
      <span aria-live="polite">{value}</span>
      <button
        type="button"
        onClick={handleIncrease}
        disabled={value >= max}
        aria-label="Aumentar quantidade"
      >
        <Plus size={14} weight="bold" />
      </button>
    </AmountInput>
  )
}
