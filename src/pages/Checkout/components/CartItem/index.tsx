import { Trash } from 'phosphor-react'
import { InputNumber } from '../../../../components/InputNumber'
import formatValue from '../../../../util/formatValue'
import { Button, CartItemContainer } from './styles'

interface Coffee {
  id: string
  price: number
  name: string
  image: string
  amount: number
}

interface CartItemProps {
  coffee: Coffee
  onRemoveItem: (id: string) => void
  onAmountChange: (id: string, value: number) => void
}

export function CartItem({
  coffee,
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
      <img src={coffee.image} alt={coffee.name} />
      <div>
        <h4>{coffee.name}</h4>
        <div>
          <InputNumber
            onChange={(value) => handleAmountChange(coffee.id, value)}
            value={coffee.amount}
          />
          <Button type="button" onClick={() => handleRemoveItem(coffee.id)}>
            <Trash size={16} />
            Remover
          </Button>
        </div>
      </div>
      <label>R$ {formatValue(coffee.price)}</label>
    </CartItemContainer>
  )
}
