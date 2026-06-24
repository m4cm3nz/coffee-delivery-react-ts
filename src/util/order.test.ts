import { describe, it, expect } from 'vitest'
import { createOrder, generateOrderId } from './order'
import type { Item } from '../contexts/OrderContext'

const items: Item[] = [
  { id: 'a', name: 'Expresso', price: 10, image: 'a.webp', amount: 2 },
]

const baseInput = {
  items,
  subTotal: 20,
  deliveryTax: 3.5,
  total: 23.5,
  address: 'Rua X, 1 - 00000-000 - Centro - Porto Alegre, RS',
  paymentMethod: 'Dinheiro',
}

describe('createOrder', () => {
  it('builds an order snapshot from the cart input', () => {
    const order = createOrder(baseInput, {
      id: 'ORDER123',
      createdAt: new Date('2026-06-24T12:00:00Z'),
    })

    expect(order).toMatchObject({
      ...baseInput,
      id: 'ORDER123',
      createdAt: '2026-06-24T12:00:00.000Z',
      estimatedDelivery: '20 - 30 min',
    })
  })

  it('generates an id and an ISO timestamp when not provided', () => {
    const order = createOrder(baseInput)

    expect(order.id).toMatch(/^[0-9A-F]+$/)
    expect(new Date(order.createdAt).toISOString()).toBe(order.createdAt)
  })
})

describe('generateOrderId', () => {
  it('returns a non-empty uppercase hex token', () => {
    const id = generateOrderId()
    expect(id).toMatch(/^[0-9A-F]+$/)
    expect(id.length).toBeGreaterThan(0)
  })
})
