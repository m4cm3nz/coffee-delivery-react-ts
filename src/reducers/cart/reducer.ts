import produce from 'immer'
import { Item } from '../../contexts/CartContext'
import { ActionTypes } from './actions'

interface CartState {
  items: Item[]
}

export function cartReducer(state: CartState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_ITEM:
      return produce(state, (draft) => {
        draft.items.push(action.payload.newItem)
      })
    case ActionTypes.REMOVE_ITEM:
      return produce(state, (draft) => {
        const index = draft.items.findIndex(
          (todo) => todo.id === action.payload.itemId,
        )
        if (index !== -1) draft.items.splice(index, 1)
      })
    case ActionTypes.UPDATE_AMOUNT:
      return produce(state, (draft) => {
        const index = draft.items.findIndex(
          (todo) => todo.id === action.payload.itemId,
        )
        draft.items[index].amount = action.payload.value
      })

    default:
      return state
  }
}
