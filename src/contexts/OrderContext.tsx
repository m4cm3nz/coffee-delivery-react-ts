import { createContext, ReactNode, useEffect, useReducer, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  addNewItemAction,
  clearItemsAction,
  removeItemAction,
  updateItemAmountAction,
} from '../reducers/cart/actions'
import { cartReducer, deriveCart } from '../reducers/cart/reducer'
import { Order, createOrder } from '../util/order'

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

const CART_KEY = '@coffee-delivery:cart-state'
const LAST_ORDER_KEY = '@coffee-delivery:last-order'
const ORDERS_KEY = '@coffee-delivery:orders'

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
}

function formatAddress(address: Address): string {
  const { street, number, postalCode, city, neighborhood, complement, state } =
    address

  const line = complement
    ? `${street}, ${number}, ${complement}`
    : `${street}, ${number}`

  return `${line} - ${postalCode} - ${neighborhood} - ${city}, ${state}`
}

function persistOrder(order: Order) {
  try {
    localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(order))

    const stored = localStorage.getItem(ORDERS_KEY)
    const orders: Order[] = stored ? JSON.parse(stored) : []
    orders.push(order)
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders))
  } catch {
    // Non-fatal: the order is still shown via in-memory state.
  }
}

export function OrderContextProvider({ children }: OrderContextProviderProps) {
  const [cartState, dispatch] = useReducer(
    cartReducer,
    deriveCart([]),
    (initialState) => {
      const storedStateAsJson = localStorage.getItem(CART_KEY)

      if (!storedStateAsJson) return initialState

      try {
        const stored = JSON.parse(storedStateAsJson)
        // Re-derive totals from persisted items so any stale or
        // legacy-shaped state is normalized on load.
        return deriveCart(stored.items ?? [])
      } catch {
        return initialState
      }
    },
  )

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cartState))
    } catch {
      // Storage may be unavailable (private mode, quota exceeded); the cart
      // still works in-memory for this session.
    }
  }, [cartState])

  const { items, itemsCount, subTotal, deliveryTax, total } = cartState

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodKeys>()

  const [lastOrder, setLastOrder] = useState<Order | null>(() => {
    try {
      const stored = localStorage.getItem(LAST_ORDER_KEY)
      return stored ? (JSON.parse(stored) as Order) : null
    } catch {
      return null
    }
  })

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

    persistOrder(order)
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
