import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from 'react'
import {
  addNewItemAction,
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

interface ConfirmCheckout {
  cep: string
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
}

export type PaymentMethodType = 'credit' | 'debit' | 'cash'

interface CartContextType {
  items: Item[]
  itemsCount: number
  subTotal: number
  deliveryTax: number
  total: number
  paymentMethod: PaymentMethodType | undefined
  addItem: (item: Item) => void
  removeItem: (coffeeId: string) => void
  updateItemAmount: (id: string, value: number) => void
  selectPaymentMethod: (type: PaymentMethodType) => void
  confirmCheckout: (data: ConfirmCheckout) => void
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

  const [paymentMethod, setPaymentMethod] = useState<
    PaymentMethodType | undefined
  >()

  useEffect(() => {
    const stateJSON = JSON.stringify(cartState)
    localStorage.setItem('@coffee-delivery:cart-state', stateJSON)
  }, [cartState])

  const { items } = cartState

  function addItem(item: Item) {
    dispach(addNewItemAction(item))
  }

  function removeItem(id: string) {
    dispach(removeItemAction(id))
  }

  function updateItemAmount(id: string, value: number) {
    dispach(updateItemAmountAction(id, value))
  }

  function confirmCheckout(data: ConfirmCheckout) {
    console.log(data)
    console.log(paymentMethod)
  }

  function selectPaymentMethod(type: PaymentMethodType) {
    setPaymentMethod(type)
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
        subTotal,
        deliveryTax,
        total,
        paymentMethod,
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
