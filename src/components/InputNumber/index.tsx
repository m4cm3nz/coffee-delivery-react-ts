import { Minus, Plus } from 'phosphor-react'
import { AmountInput } from './styles'

export function InputNumber() {
  return (
    <AmountInput>
      <button>
        <Minus size={14} weight="bold" />
      </button>
      <input
        type="number"
        id="amount"
        placeholder="0"
        step={1}
        min={0}
        max={9}
      />
      <button>
        <Plus size={14} weight="bold" />
      </button>
    </AmountInput>
  )
}
