import { describe, it, expect, beforeEach } from 'vitest'
import {
  GUEST_ID,
  loadCart,
  mergeGuestCartInto,
  saveCart,
} from './cartStorage'
import { deriveCart } from '../reducers/cart/reducer'
import type { Item } from '../contexts/OrderContext'

const item = (id: string, amount: number): Item => ({
  id,
  name: id,
  price: 10,
  image: `${id}.webp`,
  amount,
})

beforeEach(() => {
  localStorage.clear()
})

describe('cartStorage', () => {
  it('persists and reloads a cart per user', () => {
    saveCart('u1', deriveCart([item('a', 2)]))
    expect(loadCart('u1').items).toEqual([item('a', 2)])
    expect(loadCart('u2').items).toEqual([])
  })

  it('merges the guest cart into the user cart on login, summing amounts', () => {
    saveCart(GUEST_ID, deriveCart([item('a', 1), item('b', 3)]))
    saveCart('u1', deriveCart([item('a', 2)]))

    mergeGuestCartInto('u1')

    const merged = loadCart('u1').items
    expect(merged.find((i) => i.id === 'a')?.amount).toBe(3)
    expect(merged.find((i) => i.id === 'b')?.amount).toBe(3)
    // Guest cart is cleared and a second merge is a no-op.
    expect(loadCart(GUEST_ID).items).toEqual([])
    mergeGuestCartInto('u1')
    expect(loadCart('u1').items.find((i) => i.id === 'a')?.amount).toBe(3)
  })
})
