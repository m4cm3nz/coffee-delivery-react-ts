import { Bank, CreditCard, CurrencyDollar, Money } from 'phosphor-react'
import { MouseEvent, useContext } from 'react'

import {
  CartContext,
  PaymentMethodKeys,
  PaymentMethods,
} from '../../../../contexts/CartContext'
import { Button, SectionContainer } from './styles'

export function PaymentMethod() {
  const { selectPaymentMethod, paymentMethod: selectedPaymentMethod } =
    useContext(CartContext)

  const credit = selectedPaymentMethod === 'credit'
  const debit = selectedPaymentMethod === 'debit'
  const cash = selectedPaymentMethod === 'cash'

  function handleSelectPaymentMethod(event: MouseEvent<HTMLButtonElement>) {
    selectPaymentMethod(event.currentTarget.id as PaymentMethodKeys)
  }

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
        <Button
          id="credit"
          type="button"
          onClick={handleSelectPaymentMethod}
          isSelected={credit}
        >
          <Bank size={16} />
          Cartão de Crédito
        </Button>
        <Button
          id="debit"
          type="button"
          onClick={handleSelectPaymentMethod}
          isSelected={debit}
        >
          <CreditCard size={16} />
          Cartão de Débito
        </Button>
        <Button
          id="cash"
          type="button"
          onClick={handleSelectPaymentMethod}
          isSelected={cash}
        >
          <Money size={16} />
          Dinheiro
        </Button>
      </div>
    </SectionContainer>
  )
}
