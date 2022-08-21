import { useContext } from 'react'
import { CartContext, Item } from '../../../../contexts/CartContext'

import { CartItem } from '../CartItem'
import { Button, CartContainer } from './styles'

export function Cart() {
  const { items, subTotal, deliveryTax, total, removeItem, updateItemAmount } =
    useContext(CartContext)

  return (
    <CartContainer>
      <section>
        <ul>
          {items.map((item: Item) => (
            <CartItem
              key={item.id}
              coffee={item}
              onRemoveItem={removeItem}
              onAmountChange={updateItemAmount}
            />
          ))}
        </ul>
      </section>
      <footer>
        <div>
          <label>Total de itens</label>
          <label>R$ {subTotal}</label>
        </div>
        <div>
          <label>Entrega</label>
          <label>R$ {deliveryTax}</label>
        </div>
        <div>
          <strong>Total</strong>
          <strong>R$ {total}</strong>
        </div>
        <Button type="submit">Confirmar Pedido</Button>
      </footer>
    </CartContainer>
  )
}
