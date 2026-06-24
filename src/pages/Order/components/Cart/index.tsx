import { useContext } from 'react'
import { OrderContext, Item } from '../../../../contexts/OrderContext'
import formatValue from '../../../../util/formatValue'

import { CartItem } from '../CartItem'
import { Button, CartContainer, EmptyCart, PaymentHint } from './styles'

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

  const hasItems = items.length > 0
  const needsPaymentMethod = hasItems && paymentMethod === undefined
  const canConfirm = hasItems && paymentMethod !== undefined

  return (
    <CartContainer>
      <section>
        {hasItems ? (
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
        ) : (
          <EmptyCart>
            Seu carrinho está vazio. Adicione cafés para continuar.
          </EmptyCart>
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
        {needsPaymentMethod && (
          <PaymentHint role="alert">
            Selecione uma forma de pagamento para continuar.
          </PaymentHint>
        )}
        <Button type="submit" disabled={!canConfirm}>
          Confirmar Pedido
        </Button>
      </footer>
    </CartContainer>
  )
}
