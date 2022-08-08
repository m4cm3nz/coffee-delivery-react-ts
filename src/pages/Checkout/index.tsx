import { Bank, CreditCard, CurrencyDollar, MapPin, Money } from 'phosphor-react'
import { Cart } from './components/Cart'
import {
  AddressInfo,
  CheckoutOptions,
  Input,
  PaymentMethod,
  CheckoutContainer,
  OrderConfirmation,
  Button,
} from './styles'

export function Checkout() {
  return (
    <CheckoutContainer>
      <CheckoutOptions>
        <header>
          <h4>Complete seu pedido</h4>
        </header>
        <form>
          <AddressInfo>
            <header>
              <MapPin size={22} />
              <div>
                <h4>Endereço de entrega</h4>
                <p>Informe o endereço onde deseja receber seu pedido</p>
              </div>
            </header>
            <fieldset>
              <Input type="text" required placeholder="CEP" title="cep" />
              <Input type="text" required placeholder="Rua" title="rua" />
              <div>
                <Input
                  type="text"
                  required
                  placeholder="Numero"
                  title="numero"
                />
                <Input
                  type="text"
                  placeholder="Complemento"
                  title="complemento"
                />
              </div>
              <div>
                <Input
                  type="text"
                  required
                  placeholder="Bairro"
                  title="bairro"
                />
                <Input
                  type="text"
                  required
                  placeholder="Cidade"
                  title="cidade"
                />
                <Input type="text" required placeholder="UF" title="estado" />
              </div>
            </fieldset>
          </AddressInfo>
          <PaymentMethod>
            <header>
              <CurrencyDollar size={22} />
              <div>
                <h4>Pagamento</h4>
                <p>
                  O pagamento é feito na entrega. Escolha a forma que deseja
                  pagar
                </p>
              </div>
            </header>
            <div>
              <Button>
                <Bank size={16} />
                Cartão de Crédito
              </Button>
              <Button>
                <CreditCard size={16} />
                Cartão de Débito
              </Button>
              <Button>
                <Money size={16} />
                Dinheiro
              </Button>
            </div>
          </PaymentMethod>
        </form>
      </CheckoutOptions>
      <OrderConfirmation>
        <header>
          <h4>Cafés selecionados</h4>
        </header>
        <Cart />
      </OrderConfirmation>
    </CheckoutContainer>
  )
}
