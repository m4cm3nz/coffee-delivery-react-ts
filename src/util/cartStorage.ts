import type { Item } from '../contexts/OrderContext'
import { CartState, deriveCart } from '../reducers/cart/reducer'
import type { Order } from './order'

export const GUEST_ID = 'guest'

const cartKey = (userId: string) => `@coffee-delivery:${userId}:cart`
const lastOrderKey = (userId: string) => `@coffee-delivery:${userId}:last-order`
const ordersKey = (userId: string) => `@coffee-delivery:${userId}:orders`

function readItems(userId: string): Item[] {
  try {
    const raw = localStorage.getItem(cartKey(userId))
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed.items) ? parsed.items : []
  } catch {
    return []
  }
}

export function loadCart(userId: string): CartState {
  return deriveCart(readItems(userId))
}

export function saveCart(userId: string, state: CartState) {
  try {
    localStorage.setItem(cartKey(userId), JSON.stringify({ items: state.items }))
  } catch {
    // Storage may be unavailable; cart still works in memory this session.
  }
}

export function loadLastOrder(userId: string): Order | null {
  try {
    const raw = localStorage.getItem(lastOrderKey(userId))
    return raw ? (JSON.parse(raw) as Order) : null
  } catch {
    return null
  }
}

export function saveOrder(userId: string, order: Order) {
  try {
    localStorage.setItem(lastOrderKey(userId), JSON.stringify(order))

    const raw = localStorage.getItem(ordersKey(userId))
    const orders: Order[] = raw ? JSON.parse(raw) : []
    orders.push(order)
    localStorage.setItem(ordersKey(userId), JSON.stringify(orders))
  } catch {
    // Non-fatal: the order is still shown via in-memory state.
  }
}

function mergeItems(base: Item[], extra: Item[]): Item[] {
  const result = base.map((item) => ({ ...item }))

  for (const item of extra) {
    const existing = result.find((current) => current.id === item.id)
    if (existing) existing.amount += item.amount
    else result.push({ ...item })
  }

  return result
}

/**
 * Folds the guest cart into the given user's cart and clears the guest cart.
 * Idempotent (safe under React StrictMode double-invocation): once moved, the
 * guest cart is empty and subsequent calls are no-ops.
 */
export function mergeGuestCartInto(userId: string) {
  if (userId === GUEST_ID) return

  const guestItems = readItems(GUEST_ID)
  if (guestItems.length === 0) return

  const merged = mergeItems(readItems(userId), guestItems)
  saveCart(userId, deriveCart(merged))

  try {
    localStorage.removeItem(cartKey(GUEST_ID))
  } catch {
    // ignore
  }
}
