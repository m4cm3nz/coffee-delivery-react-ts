import { createContext, ReactNode, useEffect, useReducer, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  addNewItemAction,
  clearItemsAction,
  removeItemAction,
  updateItemAmountAction,
} from '../reducers/cart/actions'
import { cartReducer } from '../reducers/cart/reducer'
import { Order, createOrder } from '../util/order'
import {
  loadCart,
  loadLastOrder,
  mergeGuestCartInto,
  saveCart,
  saveOrder,
} from '../util/cartStorage'

export interface Item {
  id: string
  price: number
  name: string
  image: string
  amount: number
}

export interface Address {
  postalCode: string
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
}

export const PaymentMethods = {
  credit: 'Cartão de Crédito',
  debit: 'Cartão de Débito',
  cash: 'Dinheiro',
} as const

export type PaymentMethodKeys = keyof typeof PaymentMethods

interface OrderContextType {
  items: Item[]
  itemsCount: number
  paymentMethod: PaymentMethodKeys | undefined
  subTotal: number
  deliveryTax: number
  total: number
  lastOrder: Order | null
  addItem: (item: Item) => void
  removeItem: (id: string) => void
  updateItemAmount: (id: string, value: number) => void
  selectPaymentMethod: (type: PaymentMethodKeys) => void
  confirmOrder: (data: Address) => void
}

// eslint-disable-next-line react-refresh/only-export-components
export const OrderContext = createContext({} as OrderContextType)

interface OrderContextProviderProps {
  children: ReactNode
  userId: string
}

function formatAddress(address: Address): string {
  const { street, number, postalCode, city, neighborhood, complement, state } =
    address

  const line = complement
    ? `${street}, ${number}, ${complement}`
    : `${street}, ${number}`

  return `${line} - ${postalCode} - ${neighborhood} - ${city}, ${state}`
}

export function OrderContextProvider({
  children,
  userId,
}: OrderContextProviderProps) {
  // The provider is remounted (keyed) when the user changes, so initializing
  // from the user's scoped storage here is enough — no cross-user effects.
  const [cartState, dispatch] = useReducer(cartReducer, userId, (id) => {
    mergeGuestCartInto(id)
    return loadCart(id)
  })

  useEffect(() => {
    saveCart(userId, cartState)
  }, [cartState, userId])

  const { items, itemsCount, subTotal, deliveryTax, total } = cartState

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodKeys>()
  const [lastOrder, setLastOrder] = useState<Order | null>(() =>
    loadLastOrder(userId),
  )

  const navigate = useNavigate()

  function addItem(item: Item) {
    dispatch(addNewItemAction(item))
  }

  function removeItem(id: string) {
    dispatch(removeItemAction(id))
  }

  function updateItemAmount(id: string, value: number) {
    dispatch(updateItemAmountAction(id, value))
  }

  function selectPaymentMethod(type: PaymentMethodKeys) {
    setPaymentMethod(type)
  }

  function confirmOrder(address: Address) {
    if (!paymentMethod || items.length === 0) return

    const order = createOrder({
      items,
      subTotal,
      deliveryTax,
      total,
      address: formatAddress(address),
      paymentMethod: PaymentMethods[paymentMethod],
    })

    saveOrder(userId, order)
    setLastOrder(order)

    dispatch(clearItemsAction())
    setPaymentMethod(undefined)

    navigate('/checkout')
  }

  return (
    <OrderContext.Provider
      value={{
        items,
        itemsCount,
        paymentMethod,
        subTotal,
        deliveryTax,
        total,
        lastOrder,
        addItem,
        removeItem,
        updateItemAmount,
        selectPaymentMethod,
        confirmOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}
