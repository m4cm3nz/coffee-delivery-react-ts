import produce from 'immer'
import { Item } from '../../contexts/OrderContext'
import { ActionTypes } from './actions'

interface CartState {
  items: Item[]
  itemsCount: number
  subTotal: number
  deliveryTax: number
  total: number
}

export function cartReducer(state: CartState, action: any) {
  let cartState: CartState = {
    items: [],
    itemsCount: 0,
    subTotal: 0,
    deliveryTax: 3.5,
    total: 0,
  }

  switch (action.type) {
    case ActionTypes.ADD_NEW_ITEM:
      cartState = produce(state, (draft) => {
        draft.items.push(action.payload.newItem)
      })
      break
    case ActionTypes.REMOVE_ITEM:
      cartState = produce(state, (draft) => {
        const index = draft.items.findIndex(
          (todo) => todo.id === action.payload.itemId,
        )
        if (index !== -1) draft.items.splice(index, 1)
      })
      break
    case ActionTypes.UPDATE_AMOUNT:
      cartState = produce(state, (draft) => {
        const index = draft.items.findIndex(
          (todo) => todo.id === action.payload.itemId,
        )
        draft.items[index].amount = action.payload.value
      })
      break
    case ActionTypes.CLEAR_ITEMS:
      cartState = produce(state, (draft) => {
        draft.items = []
      })
      break
    default:
      return state
  }

  const sumSubTotal = (items: Item[]) => {
    return items.length > 0
      ? items
          .map((item) => item.amount * item.price)
          .reduce((previous, current) => {
            return previous + current
          })
      : 0
  }

  const itemsCount = cartState.items.length
  const subTotal = sumSubTotal(cartState.items)
  const deliveryTax = 3.5
  const total = subTotal + deliveryTax

  return {
    ...cartState,
    itemsCount,
    subTotal,
    deliveryTax,
    total,
  }
}
