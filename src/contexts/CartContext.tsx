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
import { cartReducer } from '../reducers/cart/reducer'

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

interface CartContextType {
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
  confirmCheckout: (data: Address) => void
}

export const CartContext = createContext({} as CartContextType)

interface CartContextProviderProps {
  children: ReactNode
}

export function CartContextProvider({ children }: CartContextProviderProps) {
  const noItemsCartState = {
    items: [],
  }

  const [cartState, dispach] = useReducer(cartReducer, noItemsCartState, () => {
    const storedStateAsJson = localStorage.getItem(
      '@coffee-delivery:cart-state',
    )
    return storedStateAsJson ? JSON.parse(storedStateAsJson) : noItemsCartState
  })

  useEffect(() => {
    const stateJSON = JSON.stringify(cartState)
    localStorage.setItem('@coffee-delivery:cart-state', stateJSON)
  }, [cartState])

  const { items } = cartState

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodKeys>()

  const [delivery, setDelivery] = useState<Delivery>({
    paymentMethod: '',
    address: '',
  })

  function addItem(item: Item) {
    dispach(addNewItemAction(item))
  }

  function removeItem(id: string) {
    dispach(removeItemAction(id))
  }

  function updateItemAmount(id: string, value: number) {
    dispach(updateItemAmountAction(id, value))
  }

  const navigate = useNavigate()

  function confirmCheckout(data: Address) {
    setDelivery({
      paymentMethod: PaymentMethods[paymentMethod!],
      address: getDeliveryAddress(data)!,
    })

    navigate('/order-confirmed')

    dispach(clearItemsAction())
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

  const itemsCount = items.length

  const subTotal =
    itemsCount > 0
      ? items
          .map((item) => item.amount * item.price)
          .reduce((previous, current) => {
            return previous + current
          })
      : 0

  const deliveryTax = 3.5
  const total = subTotal + deliveryTax

  return (
    <CartContext.Provider
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
        confirmCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
