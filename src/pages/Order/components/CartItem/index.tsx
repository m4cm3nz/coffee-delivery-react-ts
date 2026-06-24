import { InputNumber } from '../../../../components/InputNumber'
import formatValue from '../../../../util/formatValue'
import { Item } from '../../../../contexts/OrderContext'
import { coffeeMenu } from '../../../../data/coffeeMenu'
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
  // Resolve the image from the catalog by id so persisted carts stay valid
  // even when asset paths change (the stored item.image may be stale).
  const image = coffeeMenu.find((coffee) => coffee.id === item.id)?.image ?? item.image

  return (
    <CartItemContainer>
      <img src={image} alt={item.name} loading="lazy" />
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
