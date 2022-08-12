import { Bank, CreditCard, CurrencyDollar, Money } from 'phosphor-react'
import { Button, SectionContainer } from './styles'

export function PaymentMethod() {
  return (
    <SectionContainer>
      <header>
        <CurrencyDollar size={22} />
        <div>
          <h4>Pagamento</h4>
          <p>
            O pagamento é feito na entrega. Escolha a forma que deseja pagar
          </p>
        </div>
      </header>
      <div>
        <Button type="button">
          <Bank size={16} />
          Cartão de Crédito
        </Button>
        <Button type="button">
          <CreditCard size={16} />
          Cartão de Débito
        </Button>
        <Button type="button">
          <Money size={16} />
          Dinheiro
        </Button>
      </div>
    </SectionContainer>
  )
}
