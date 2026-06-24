import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext, useEffect, useRef } from 'react'
import { AddressInfo } from './components/AddressInfo'
import { Cart } from './components/Cart'
import { PaymentMethod } from './components/PaymentMethod'
import { OrderContainer } from './styles'
import { OrderContext } from '../../contexts/OrderContext'
import { useAuth } from '../../contexts/AuthContext'
import { useAddressBook } from '../../hooks/useAddressBook'
import {
  addressValidationSchema,
  OrderFormData,
  toAddressFields,
} from './orderForm'

export function Order() {
  const { confirmOrder } = useContext(OrderContext)
  const { user, isAuthenticated } = useAuth()
  const { addresses, defaultAddress, loading, save, setDefault, remove } =
    useAddressBook(user?.id ?? null)

  const checkoutForm = useForm<OrderFormData>({
    resolver: zodResolver(addressValidationSchema),
    defaultValues: {
      postalCode: '',
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
      addressId: '',
      saveAddress: false,
      addressLabel: 'Casa',
      makeDefault: false,
    },
  })

  const { handleSubmit, reset, setValue } = checkoutForm

  // Prefill once after the address book loads: with the preferred address, or
  // pre-arm the save controls for a first-time user.
  const prefilled = useRef(false)
  useEffect(() => {
    if (prefilled.current || loading || !isAuthenticated) return
    prefilled.current = true

    if (defaultAddress) {
      reset({
        postalCode: defaultAddress.postalCode,
        street: defaultAddress.street,
        number: defaultAddress.number,
        complement: defaultAddress.complement ?? '',
        neighborhood: defaultAddress.neighborhood,
        city: defaultAddress.city,
        state: defaultAddress.state,
        // No addressId: the prefill is for *using* the address, not editing it.
        // Editing in place is an explicit action (pencil) in the picker.
        addressId: '',
        addressLabel: defaultAddress.label,
        saveAddress: false,
        makeDefault: false,
      })
    } else {
      setValue('saveAddress', true)
      setValue('makeDefault', true)
    }
  }, [loading, isAuthenticated, defaultAddress, reset, setValue])

  async function handleOrderConfirm(data: OrderFormData) {
    const address = toAddressFields(data)

    if (isAuthenticated && data.saveAddress) {
      await save({
        ...address,
        id: data.addressId || undefined,
        label: data.addressLabel ?? 'Casa',
        makeDefault: data.makeDefault,
      })
    }

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
            <AddressInfo
              isAuthenticated={isAuthenticated}
              addresses={addresses}
              onSetDefault={setDefault}
              onRemove={remove}
            />
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
