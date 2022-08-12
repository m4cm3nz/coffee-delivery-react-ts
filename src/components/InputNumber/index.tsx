import { Minus, Plus } from 'phosphor-react'
import { useRef } from 'react'
import { AmountInput } from './styles'

export function InputNumber() {
  const inputRef = useRef<HTMLInputElement>(null)

  function handleAmountDecraese() {
    const { current } = inputRef

    if (current && current.valueAsNumber > parseInt(current.min))
      current.valueAsNumber -= 1
  }

  function handleAmountIncraese() {
    const { current } = inputRef

    if (current && current.valueAsNumber < parseInt(current.max))
      current.valueAsNumber += 1
  }

  return (
    <AmountInput>
      <button onClick={handleAmountDecraese}>
        <Minus size={14} weight="bold" />
      </button>
      <input
        ref={inputRef}
        type="number"
        id="amount"
        placeholder="0"
        step={1}
        min={0}
        max={9}
        defaultValue={0}
      />
      <button onClick={handleAmountIncraese}>
        <Plus size={14} weight="bold" />
      </button>
    </AmountInput>
  )
}
