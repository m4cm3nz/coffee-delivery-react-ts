import { Minus, Plus } from 'phosphor-react'
import { InputHTMLAttributes, useRef } from 'react'
import { AmountInput } from './styles'

type InputNumberProps = InputHTMLAttributes<HTMLInputElement> & {
  value: number
  onValueChange: (value: number) => void
}

export function InputNumber({
  value,
  onValueChange,
  ...rest
}: InputNumberProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  function handleValueDecraese() {
    const { current } = inputRef

    if (current && current.valueAsNumber > parseInt(current.min))
      onValueChange((current.valueAsNumber -= 1))
  }

  function handleValueIncraese() {
    const { current } = inputRef

    if (current && current.valueAsNumber < parseInt(current.max))
      onValueChange((current.valueAsNumber += 1))
  }

  return (
    <AmountInput>
      <button type="button" onClick={handleValueDecraese}>
        <Minus size={14} weight="bold" />
      </button>
      <input ref={inputRef} type="number" defaultValue={value} {...rest} />
      <button type="button" onClick={handleValueIncraese}>
        <Plus size={14} weight="bold" />
      </button>
    </AmountInput>
  )
}
