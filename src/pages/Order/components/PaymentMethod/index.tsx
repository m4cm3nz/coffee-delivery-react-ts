import { Bank, CreditCard, CurrencyDollar, Money } from '@phosphor-icons/react'
import { useContext } from 'react'
import { OrderContext, PaymentMethods } from '../../../../contexts/OrderContext'
import { HiddenRadio, Option, Options, SectionContainer } from './styles'

const paymentOptions = [
  { id: 'credit', label: PaymentMethods.credit, icon: Bank },
  { id: 'debit', label: PaymentMethods.debit, icon: CreditCard },
  { id: 'cash', label: PaymentMethods.cash, icon: Money },
] as const

export function PaymentMethod() {
  const { selectPaymentMethod, paymentMethod } = useContext(OrderContext)

  return (
    <SectionContainer>
      <header>
        <CurrencyDollar size={22} />
        <div>
          <h4>Pagamento</h4>
          <p>O pagamento é feito na entrega. Escolha a forma que deseja pagar</p>
        </div>
      </header>
      <Options>
        <legend>Forma de pagamento</legend>
        {paymentOptions.map(({ id, label, icon: Icon }) => {
          const selected = paymentMethod === id

          return (
            <Option key={id} $selected={selected}>
              <HiddenRadio
                type="radio"
                name="payment-method"
                value={id}
                checked={selected}
                onChange={() => selectPaymentMethod(id)}
              />
              <Icon size={16} />
              {label}
            </Option>
          )
        })}
      </Options>
    </SectionContainer>
  )
}
