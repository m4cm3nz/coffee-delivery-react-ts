import { Item } from '../../contexts/OrderContext'
import { ActionTypes } from './actions'

export const DELIVERY_TAX = 3.5

export interface CartState {
  items: Item[]
  itemsCount: number
  subTotal: number
  deliveryTax: number
  total: number
}

type CartAction =
  | { type: typeof ActionTypes.ADD_NEW_ITEM; payload: { newItem: Item } }
  | { type: typeof ActionTypes.REMOVE_ITEM; payload: { itemId: string } }
  | {
      type: typeof ActionTypes.UPDATE_AMOUNT
      payload: { itemId: string; value: number }
    }
  | { type: typeof ActionTypes.CLEAR_ITEMS }

// Single source of truth for derived totals — used by both the reducer and the
// store initializer so persisted state can be safely re-hydrated.
export function deriveCart(items: Item[]): CartState {
  const itemsCount = items.length
  const subTotal = items.reduce(
    (sum, item) => sum + item.amount * item.price,
    0,
  )
  const deliveryTax = itemsCount > 0 ? DELIVERY_TAX : 0
  const total = subTotal + deliveryTax

  return { items, itemsCount, subTotal, deliveryTax, total }
}

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case ActionTypes.ADD_NEW_ITEM: {
      const { newItem } = action.payload
      const alreadyInCart = state.items.some((item) => item.id === newItem.id)

      const items = alreadyInCart
        ? state.items.map((item) =>
            item.id === newItem.id
              ? { ...item, amount: item.amount + newItem.amount }
              : item,
          )
        : [...state.items, newItem]

      return deriveCart(items)
    }
    case ActionTypes.REMOVE_ITEM:
      return deriveCart(
        state.items.filter((item) => item.id !== action.payload.itemId),
      )
    case ActionTypes.UPDATE_AMOUNT:
      return deriveCart(
        state.items.map((item) =>
          item.id === action.payload.itemId
            ? { ...item, amount: action.payload.value }
            : item,
        ),
      )
    case ActionTypes.CLEAR_ITEMS:
      return deriveCart([])
    default:
      return state
  }
}
