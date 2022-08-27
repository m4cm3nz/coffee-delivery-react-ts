import { Trash } from 'phosphor-react'
import { FormEvent } from 'react'
import { InputNumber } from '../../../../components/InputNumber'
import formatValue from '../../../../util/formatValue'
import { Button, CartItemContainer } from './styles'

interface Item {
  id: string
  price: number
  name: string
  image: string
  amount: number
}

interface CartItemProps {
  item: Item
  onRemoveItem: (id: string) => void
  onAmountChange: (id: string, value: number) => void
}

export function CartItem({
  item,
  onRemoveItem,
  onAmountChange,
}: CartItemProps) {
  function handleAmountChange(id: string, value: number) {
    onAmountChange(id, value)
  }

  function handleRemoveItem(id: string) {
    onRemoveItem(id)
  }

  function handleInputAmount(event: FormEvent<HTMLInputElement>) {
    const { value, maxLength, minLength } = event.currentTarget

    if (value.length > maxLength)
      event.currentTarget.value = value.slice(0, maxLength)

    if (
      event.currentTarget.value.length < minLength ||
      event.currentTarget.valueAsNumber < minLength
    )
      event.currentTarget.value = minLength.toString()
  }

  return (
    <CartItemContainer>
      <img src={item.image} alt={item.name} />
      <div>
        <h4>{item.name}</h4>
        <div>
          <InputNumber
            onInput={handleInputAmount}
            onValueChange={(value) => handleAmountChange(item.id, value)}
            placeholder="1"
            step={1}
            min={1}
            max={9}
            maxLength={1}
            minLength={1}
            value={item.amount}
          />
          <Button type="button" onClick={() => handleRemoveItem(item.id)}>
            <Trash size={16} />
            Remover
          </Button>
        </div>
      </div>
      <label>R$ {formatValue(item.price)}</label>
    </CartItemContainer>
  )
}
