import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from 'react'
import { useNavigate } from 'react-router-dom'
import {
  addNewItemAction,
  clearItemsAction,
  removeItemAction,
  updateItemAmountAction,
} from '../reducers/cart/actions'
import { cartReducer, deriveCart } from '../reducers/cart/reducer'

export interface Item {
  id: string
  price: number
  name: string
  image: string
  amount: number
}

interface Address {
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

interface Delivery {
  address: string
  paymentMethod: string
}

interface OrderContextType {
  items: Item[]
  itemsCount: number
  paymentMethod: PaymentMethodKeys | undefined
  subTotal: number
  deliveryTax: number
  total: number
  delivery: Delivery
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

export function OrderContextProvider({ children }: OrderContextProviderProps) {
  const [cartState, dispatch] = useReducer(
    cartReducer,
    deriveCart([]),
    (initialState) => {
      const storedStateAsJson = localStorage.getItem(
        '@coffee-delivery:cart-state',
      )

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
      localStorage.setItem(
        '@coffee-delivery:cart-state',
        JSON.stringify(cartState),
      )
    } catch {
      // Storage may be unavailable (private mode, quota exceeded); the cart
      // still works in-memory for this session.
    }
  }, [cartState])

  const { items, itemsCount, subTotal, deliveryTax, total } = cartState

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodKeys>()

  const [delivery, setDelivery] = useState<Delivery>({
    paymentMethod: '',
    address: '',
  })

  function addItem(item: Item) {
    dispatch(addNewItemAction(item))
  }

  function removeItem(id: string) {
    dispatch(removeItemAction(id))
  }

  function updateItemAmount(id: string, value: number) {
    dispatch(updateItemAmountAction(id, value))
  }

  const navigate = useNavigate()

  function confirmOrder(address: Address) {
    setDelivery({
      paymentMethod: PaymentMethods[paymentMethod!],
      address: getDeliveryAddress(address)!,
    })

    navigate('/checkout')

    dispatch(clearItemsAction())
    setPaymentMethod(undefined)
  }

  function selectPaymentMethod(type: PaymentMethodKeys) {
    setPaymentMethod(type)
  }

  function getDeliveryAddress(address: Address | undefined) {
    if (address) {
      const {
        street,
        number,
        postalCode,
        city,
        neighborhood,
        complement,
        state,
      } = address

      return `${
        complement
          ? `${street}, ${number}, ${complement}`
          : `${street}, ${number}`
      } - ${postalCode} - ${neighborhood} - ${city}, ${state}`
    }
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
        delivery,
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
