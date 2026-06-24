import {
  addressEquals,
  AddressFields,
  AddressService,
  SavedAddress,
} from './types'

const storageKey = (userId: string) => `@coffee-delivery:${userId}:addresses`

function read(userId: string): SavedAddress[] {
  try {
    const raw = localStorage.getItem(storageKey(userId))
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function write(userId: string, addresses: SavedAddress[]) {
  try {
    localStorage.setItem(storageKey(userId), JSON.stringify(addresses))
  } catch {
    // Storage may be unavailable; ignore.
  }
}

function sortDefaultFirst(addresses: SavedAddress[]): SavedAddress[] {
  return [...addresses].sort(
    (a, b) => Number(b.isDefault) - Number(a.isDefault),
  )
}

function pickFields(input: AddressFields): AddressFields {
  return {
    postalCode: input.postalCode,
    street: input.street,
    number: input.number,
    complement: input.complement,
    neighborhood: input.neighborhood,
    city: input.city,
    state: input.state,
  }
}

export function createLocalAddressService(): AddressService {
  return {
    async list(userId) {
      return sortDefaultFirst(read(userId))
    },

    async getDefault(userId) {
      const all = read(userId)
      return all.find((address) => address.isDefault) ?? all[0] ?? null
    },

    async save(userId, input) {
      const all = read(userId)
      const fields = pickFields(input)
      const isFirst = all.length === 0
      const makeDefault = Boolean(input.makeDefault) || isFirst

      // Match by id when updating, otherwise fold an identical address into the
      // existing one instead of creating a duplicate.
      const existingIndex = input.id
        ? all.findIndex((address) => address.id === input.id)
        : all.findIndex((address) => addressEquals(address, fields))

      let saved: SavedAddress
      let next: SavedAddress[]

      if (existingIndex >= 0) {
        saved = {
          ...all[existingIndex],
          ...fields,
          label: input.label,
          isDefault: makeDefault || all[existingIndex].isDefault,
        }
        next = all.map((address, index) =>
          index === existingIndex ? saved : address,
        )
      } else {
        saved = {
          id: crypto.randomUUID(),
          ...fields,
          label: input.label,
          isDefault: makeDefault,
        }
        next = [...all, saved]
      }

      if (makeDefault) {
        next = next.map((address) => ({
          ...address,
          isDefault: address.id === saved.id,
        }))
      }

      write(userId, next)
      return saved
    },

    async setDefault(userId, addressId) {
      const next = read(userId).map((address) => ({
        ...address,
        isDefault: address.id === addressId,
      }))
      write(userId, next)
    },

    async remove(userId, addressId) {
      const remaining = read(userId).filter(
        (address) => address.id !== addressId,
      )

      // Keep an invariant: if any addresses remain, one stays the default.
      if (remaining.length > 0 && !remaining.some((a) => a.isDefault)) {
        remaining[0] = { ...remaining[0], isDefault: true }
      }

      write(userId, remaining)
    },
  }
}
