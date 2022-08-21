import { FormProvider, useForm } from 'react-hook-form'
import { AddressInfo } from './components/AddressInfo'
import { Cart } from './components/Cart'
import { PaymentMethod } from './components/PaymentMethod'
import { CheckoutContainer } from './styles'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useContext } from 'react'
import { CartContext } from '../../contexts/CartContext'

const checkoutValidationSchema = zod.object({
  cep: zod.string().min(8, 'Preencha o cep').max(8),
  street: zod.string().min(5).max(120),
  number: zod.string().min(1).max(20),
  neighborhood: zod.string().min(5).max(60),
  city: zod.string().min(5).max(60),
  state: zod.string().min(2).max(20),
})

type CheckoutFromData = zod.infer<typeof checkoutValidationSchema>

export function Checkout() {
  const { confirmCheckout } = useContext(CartContext)

  const checkoutFrom = useForm<CheckoutFromData>({
    resolver: zodResolver(checkoutValidationSchema),
    defaultValues: {
      cep: '',
      street: '',
      number: '',
      neighborhood: '',
      city: '',
      state: '',
    },
  })

  const { handleSubmit, reset } = checkoutFrom

  function handleCheckout(data: CheckoutFromData) {
    confirmCheckout(data)
    reset()
  }

  return (
    <CheckoutContainer>
      <form onSubmit={handleSubmit(handleCheckout)} action="">
        <main>
          <header>
            <h4>Complete seu pedido</h4>
          </header>
          <FormProvider {...checkoutFrom}>
            <AddressInfo />
            <PaymentMethod />
          </FormProvider>
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
