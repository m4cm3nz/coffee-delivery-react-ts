import { CartItem } from '../CartItem'
import { Button, CartContainer } from './styles'

export function Cart() {
  return (
    <CartContainer>
      <section>
        <ul>
          <li>
            <CartItem />
          </li>
          <li>
            <CartItem />
          </li>
        </ul>
      </section>
      <footer>
        <div>
          <label>Total de itens</label>
          <label>R$ 29,70</label>
        </div>
        <div>
          <label>Entrega</label>
          <label>R$ 3,50</label>
        </div>
        <div>
          <strong>Total</strong>
          <strong>R$ 33,20</strong>
        </div>
        <Button>Confirmar Pedido</Button>
      </footer>
    </CartContainer>
  )
}
