import { describe, it, expect } from 'vitest'
import { cartReducer, deriveCart, DELIVERY_TAX } from './reducer'
import {
  addNewItemAction,
  removeItemAction,
  updateItemAmountAction,
  clearItemsAction,
} from './actions'
import { Item } from '../../contexts/OrderContext'

const makeItem = (over: Partial<Item> = {}): Item => ({
  id: 'expresso',
  name: 'Expresso',
  price: 10,
  image: 'expresso.webp',
  amount: 1,
  ...over,
})

const emptyCart = () => deriveCart([])

describe('deriveCart', () => {
  it('returns zeroed totals and no delivery fee for an empty cart', () => {
    const state = deriveCart([])
    expect(state).toMatchObject({
      itemsCount: 0,
      subTotal: 0,
      deliveryTax: 0,
      total: 0,
    })
  })

  it('sums the subtotal across items and adds the delivery fee', () => {
    const state = deriveCart([
      makeItem({ id: 'a', price: 10, amount: 2 }),
      makeItem({ id: 'b', price: 5, amount: 1 }),
    ])
    expect(state.itemsCount).toBe(2)
    expect(state.subTotal).toBe(25)
    expect(state.deliveryTax).toBe(DELIVERY_TAX)
    expect(state.total).toBe(25 + DELIVERY_TAX)
  })
})

describe('cartReducer', () => {
  it('adds a new item', () => {
    const state = cartReducer(emptyCart(), addNewItemAction(makeItem({ id: 'a' })))
    expect(state.items).toHaveLength(1)
    expect(state.itemsCount).toBe(1)
  })

  it('merges the quantity when the same item is added again', () => {
    let state = cartReducer(
      emptyCart(),
      addNewItemAction(makeItem({ id: 'a', amount: 2 })),
    )
    state = cartReducer(state, addNewItemAction(makeItem({ id: 'a', amount: 3 })))
    expect(state.items).toHaveLength(1)
    expect(state.items[0].amount).toBe(5)
  })

  it('keeps distinct items separate', () => {
    let state = cartReducer(emptyCart(), addNewItemAction(makeItem({ id: 'a' })))
    state = cartReducer(state, addNewItemAction(makeItem({ id: 'b' })))
    expect(state.items.map((item) => item.id)).toEqual(['a', 'b'])
  })

  it('updates the amount and recomputes the subtotal', () => {
    let state = cartReducer(
      emptyCart(),
      addNewItemAction(makeItem({ id: 'a', price: 10, amount: 1 })),
    )
    state = cartReducer(state, updateItemAmountAction('a', 4))
    expect(state.items[0].amount).toBe(4)
    expect(state.subTotal).toBe(40)
  })

  it('removes an item by id', () => {
    let state = cartReducer(emptyCart(), addNewItemAction(makeItem({ id: 'a' })))
    state = cartReducer(state, addNewItemAction(makeItem({ id: 'b' })))
    state = cartReducer(state, removeItemAction('a'))
    expect(state.items.map((item) => item.id)).toEqual(['b'])
  })

  it('zeroes the delivery fee after removing the last item', () => {
    let state = cartReducer(emptyCart(), addNewItemAction(makeItem({ id: 'a' })))
    state = cartReducer(state, removeItemAction('a'))
    expect(state.items).toHaveLength(0)
    expect(state.deliveryTax).toBe(0)
    expect(state.total).toBe(0)
  })

  it('clears all items', () => {
    let state = cartReducer(emptyCart(), addNewItemAction(makeItem({ id: 'a' })))
    state = cartReducer(state, clearItemsAction())
    expect(state.items).toHaveLength(0)
    expect(state.total).toBe(0)
  })

  it('does not mutate the previous state', () => {
    const initial = deriveCart([makeItem({ id: 'a', amount: 1 })])
    const next = cartReducer(initial, updateItemAmountAction('a', 9))
    expect(initial.items[0].amount).toBe(1)
    expect(next.items[0].amount).toBe(9)
  })
})
