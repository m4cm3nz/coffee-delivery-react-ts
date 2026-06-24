import { FormProvider, useForm } from 'react-hook-form'
import { AddressInfo } from './components/AddressInfo'
import { Cart } from './components/Cart'
import { PaymentMethod } from './components/PaymentMethod'
import { OrderContainer } from './styles'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useContext } from 'react'
import { OrderContext } from '../../contexts/OrderContext'

const addressValidationSchema = zod.object({
  postalCode: zod
    .string()
    .min(10, 'Informe um código postal válido')
    .max(10, 'Informe um código postal válido'),
  street: zod.string().min(1, 'Informe a rua').max(120),
  number: zod.string().min(1, 'Informe o número').max(20),
  complement: zod.string().max(80).optional(),
  neighborhood: zod.string().min(1, 'Informe o bairro').max(60),
  city: zod.string().min(1, 'Informe a cidade').max(60),
  state: zod.string().min(1, 'UF').max(20),
})

type AddressFormData = zod.infer<typeof addressValidationSchema>

export function Order() {
  const { confirmOrder } = useContext(OrderContext)

  const checkoutForm = useForm<AddressFormData>({
    resolver: zodResolver(addressValidationSchema),
    defaultValues: {
      postalCode: '',
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
    },
  })

  const { handleSubmit } = checkoutForm

  function handleOrderConfirm(address: AddressFormData) {
    confirmOrder(address)
  }

  return (
    <OrderContainer>
      <form onSubmit={handleSubmit(handleOrderConfirm)}>
        <main>
          <header>
            <h4>Complete seu pedido</h4>
          </header>
          <FormProvider {...checkoutForm}>
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
