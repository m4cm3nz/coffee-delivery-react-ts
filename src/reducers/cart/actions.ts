import { Item } from '../../contexts/OrderContext'

export enum ActionTypes {
  ADD_NEW_ITEM = 'ADD_NEW_ITEM',
  REMOVE_ITEM = 'REMOVE_ITEM',
  UPDATE_AMOUNT = 'UPDATE_AMOUNT',
  CLEAR_ITEMS = 'CLEAR_ITEMS',
}

export function addNewItemAction(newItem: Item) {
  return {
    type: ActionTypes.ADD_NEW_ITEM,
    payload: {
      newItem,
    },
  }
}

export function removeItemAction(itemId: string) {
  return {
    type: ActionTypes.REMOVE_ITEM,
    payload: {
      itemId,
    },
  }
}

export function updateItemAmountAction(itemId: string, value: number) {
  return {
    type: ActionTypes.UPDATE_AMOUNT,
    payload: {
      itemId,
      value,
    },
  }
}

export function clearItemsAction() {
  return {
    type: ActionTypes.CLEAR_ITEMS,
  }
}
