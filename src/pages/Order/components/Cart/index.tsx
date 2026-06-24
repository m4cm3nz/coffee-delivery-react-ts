import { useContext } from 'react'
import { OrderContext, Item } from '../../../../contexts/OrderContext'
import formatValue from '../../../../util/formatValue'

import { CartItem } from '../CartItem'
import { Button, CartContainer, EmptyCart } from './styles'

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
        {items.length === 0 ? (
          <EmptyCart>
            Seu carrinho está vazio. Adicione cafés para continuar.
          </EmptyCart>
        ) : (
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
        )}
      </section>
      <footer>
        <div>
          <span>Total de itens</span>
          <span>R$ {formatValue(subTotal)}</span>
        </div>
        <div>
          <span>Entrega</span>
          <span>R$ {formatValue(deliveryTax)}</span>
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
