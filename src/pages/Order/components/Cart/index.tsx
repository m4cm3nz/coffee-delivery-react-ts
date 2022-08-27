import { useContext } from 'react'
import { OrderContext, Item } from '../../../../contexts/OrderContext'
import formatValue from '../../../../util/formatValue'

import { CartItem } from '../CartItem'
import { Button, CartContainer } from './styles'

export function Cart() {
  const {
    items,
    subTotal,
    deliveryTax,
    total,
    paymentMethod,
    removeItem,
    updateItemAmount,
  } = useContext(OrderContext)

  const requireUserInteraction =
    paymentMethod === undefined || items.length === 0

  return (
    <CartContainer>
      <section>
        <ul>
          {items.map((item: Item) => (
            <CartItem
              key={item.id}
              item={item}
              onRemoveItem={removeItem}
              onAmountChange={updateItemAmount}
            />
          ))}
        </ul>
      </section>
      <footer>
        <div>
          <label>Total de itens</label>
          <label>R$ {formatValue(subTotal)}</label>
        </div>
        <div>
          <label>Entrega</label>
          <label>R$ {formatValue(deliveryTax)}</label>
        </div>
        <div>
          <strong>Total</strong>
          <strong>R$ {formatValue(total)}</strong>
        </div>
        <Button type="submit" disabled={requireUserInteraction}>
          Confirmar Pedido
        </Button>
      </footer>
    </CartContainer>
  )
}
