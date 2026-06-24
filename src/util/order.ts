import type { Item } from '../contexts/OrderContext'

export interface Order {
  id: string
  items: Item[]
  subTotal: number
  deliveryTax: number
  total: number
  address: string
  paymentMethod: string
  createdAt: string
  estimatedDelivery: string
}

interface CreateOrderInput {
  items: Item[]
  subTotal: number
  deliveryTax: number
  total: number
  address: string
  paymentMethod: string
}

interface CreateOrderOptions {
  id?: string
  createdAt?: Date
}

const ESTIMATED_DELIVERY = '20 - 30 min'

/** Short, human-friendly order number (e.g. "A1B2C3D4"). */
export function generateOrderId(): string {
  return crypto.randomUUID().split('-')[0].toUpperCase()
}

/**
 * Builds an immutable order snapshot from the current cart. `id` and
 * `createdAt` can be injected for deterministic tests.
 */
export function createOrder(
  input: CreateOrderInput,
  options: CreateOrderOptions = {},
): Order {
  const createdAt = options.createdAt ?? new Date()

  return {
    ...input,
    id: options.id ?? generateOrderId(),
    createdAt: createdAt.toISOString(),
    estimatedDelivery: ESTIMATED_DELIVERY,
  }
}
