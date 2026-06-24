import { describe, it, expect, beforeEach } from 'vitest'
import { createLocalAddressService } from './localAddressService'
import { AddressFields } from './types'

const service = createLocalAddressService()
const USER = 'user@example.com'

const fields = (over: Partial<AddressFields> = {}): AddressFields => ({
  postalCode: '90000-000',
  street: 'Rua A',
  number: '10',
  neighborhood: 'Centro',
  city: 'Porto Alegre',
  state: 'RS',
  ...over,
})

beforeEach(() => {
  localStorage.clear()
})

describe('localAddressService', () => {
  it('makes the first saved address the default', async () => {
    const saved = await service.save(USER, { ...fields(), label: 'Casa' })
    expect(saved.isDefault).toBe(true)
    expect((await service.getDefault(USER))?.id).toBe(saved.id)
  })

  it('keeps a new non-default address from stealing the default', async () => {
    await service.save(USER, { ...fields(), label: 'Casa' })
    const work = await service.save(USER, {
      ...fields({ street: 'Rua B' }),
      label: 'Trabalho',
    })

    expect(work.isDefault).toBe(false)
    expect((await service.list(USER)).filter((a) => a.isDefault)).toHaveLength(1)
  })

  it('promotes a new address to default when requested, demoting the previous', async () => {
    const home = await service.save(USER, { ...fields(), label: 'Casa' })
    const work = await service.save(USER, {
      ...fields({ street: 'Rua B' }),
      label: 'Trabalho',
      makeDefault: true,
    })

    const list = await service.list(USER)
    expect(list.find((a) => a.id === work.id)?.isDefault).toBe(true)
    expect(list.find((a) => a.id === home.id)?.isDefault).toBe(false)
    // Default-first ordering.
    expect(list[0].id).toBe(work.id)
  })

  it('updates an existing address by id without duplicating it', async () => {
    const home = await service.save(USER, { ...fields(), label: 'Casa' })
    await service.save(USER, {
      ...fields({ number: '99' }),
      id: home.id,
      label: 'Casa',
    })

    const list = await service.list(USER)
    expect(list).toHaveLength(1)
    expect(list[0].number).toBe('99')
  })

  it('promotes another address to default when the default is removed', async () => {
    const home = await service.save(USER, { ...fields(), label: 'Casa' })
    await service.save(USER, { ...fields({ street: 'Rua B' }), label: 'Trabalho' })

    await service.remove(USER, home.id)

    const list = await service.list(USER)
    expect(list).toHaveLength(1)
    expect(list[0].isDefault).toBe(true)
  })

  it('scopes addresses per user', async () => {
    await service.save(USER, { ...fields(), label: 'Casa' })
    expect(await service.list('other@example.com')).toHaveLength(0)
  })
})
