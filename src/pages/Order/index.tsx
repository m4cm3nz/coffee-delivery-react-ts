import { FormProvider, useForm } from 'react-hook-form'
import { AddressInfo } from './components/AddressInfo'
import { Cart } from './components/Cart'
import { PaymentMethod } from './components/PaymentMethod'
import { OrderContainer } from './styles'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useContext } from 'react'
import { OrderContext } from '../../contexts/CartContext'

const addressValidationSchema = zod.object({
  postalCode: zod.string().min(10, 'Preencha o código postal').max(10),
  street: zod.string().min(5).max(120),
  number: zod.string().min(1).max(20),
  neighborhood: zod.string().min(5).max(60),
  city: zod.string().min(5).max(60),
  state: zod.string().min(2).max(20),
})

type AddressFromData = zod.infer<typeof addressValidationSchema>

export function Order() {
  const { confirmOrder } = useContext(OrderContext)

  const checkoutFrom = useForm<AddressFromData>({
    resolver: zodResolver(addressValidationSchema),
    defaultValues: {
      postalCode: '',
      street: '',
      number: '',
      neighborhood: '',
      city: '',
      state: '',
    },
  })

  const { handleSubmit } = checkoutFrom

  function handleOrderConfirm(address: AddressFromData) {
    confirmOrder(address)
  }

  return (
    <OrderContainer>
      <form onSubmit={handleSubmit(handleOrderConfirm)} action="">
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
    </OrderContainer>
  )
}
