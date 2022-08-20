import { createContext, ReactNode, useEffect, useReducer } from 'react'
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

interface CartContextType {
  items: Item[]
  subTotal: number
  deliveryTax: number
  total: number
  addItem: (item: Item) => void
  removeItem: (coffeeId: string) => void
  updateItemAmount: (id: string, value: number) => void
  confirm: () => void
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

  function addItem(item: Item) {
    dispach(addNewItemAction(item))
  }

  function removeItem(id: string) {
    dispach(removeItemAction(id))
  }

  function updateItemAmount(id: string, value: number) {
    dispach(updateItemAmountAction(id, value))
  }

  function confirm() {}

  const subTotal = items
    .map((item) => item.amount * item.price)
    .reduce((previous, current) => {
      return previous + current
    })

  const deliveryTax = 3.5
  const total = subTotal + deliveryTax

  return (
    <CartContext.Provider
      value={{
        items,
        subTotal,
        deliveryTax,
        total,
        addItem,
        removeItem,
        updateItemAmount,
        confirm,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
