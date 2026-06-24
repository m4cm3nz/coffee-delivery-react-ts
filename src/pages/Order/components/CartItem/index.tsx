import { InputNumber } from '../../../../components/InputNumber'
import formatValue from '../../../../util/formatValue'
import { Item } from '../../../../contexts/OrderContext'
import { CartItemContainer, Controls, Details, Price } from './styles'

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
  return (
    <CartItemContainer>
      <img src={item.image} alt={item.name} />
      <Details>
        <h4>{item.name}</h4>
        <Controls>
          <InputNumber
            value={item.amount}
            min={1}
            max={9}
            onValueChange={(value) => onAmountChange(item.id, value)}
            onRemove={() => onRemoveItem(item.id)}
          />
          <Price>R$ {formatValue(item.price)}</Price>
        </Controls>
      </Details>
    </CartItemContainer>
  )
}
