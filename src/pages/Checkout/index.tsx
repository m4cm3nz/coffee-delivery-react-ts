import { MapPin } from 'phosphor-react'
import { AddressInfo } from './components/AddressInfo'
import { Cart } from './components/Cart'
import { PaymentMethod } from './components/PaymentMethod'
import { CheckoutContainer } from './styles'

export function Checkout() {
  return (
    <CheckoutContainer>
      <form>
        <main>
          <header>
            <h4>Complete seu pedido</h4>
          </header>
          <AddressInfo />
          <PaymentMethod />
        </main>
        <aside>
          <header>
            <h4>Cafés selecionados</h4>
          </header>
          <Cart />
        </aside>
      </form>
    </CheckoutContainer>
  )
}
