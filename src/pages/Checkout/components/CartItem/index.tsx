import { Trash } from 'phosphor-react'
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

  return (
    <CartItemContainer>
      <img src={item.image} alt={item.name} />
      <div>
        <h4>{item.name}</h4>
        <div>
          <InputNumber
            onChange={(value) => handleAmountChange(item.id, value)}
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
