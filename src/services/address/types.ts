export const ADDRESS_LABELS = ['Casa', 'Trabalho', 'Outro'] as const
export type AddressLabel = (typeof ADDRESS_LABELS)[number]

export interface AddressFields {
  postalCode: string
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
}

export interface SavedAddress extends AddressFields {
  id: string
  label: AddressLabel
  isDefault: boolean
}

export interface SaveAddressInput extends AddressFields {
  /** When present, updates the matching saved address instead of creating one. */
  id?: string
  label: AddressLabel
  makeDefault?: boolean
}

/**
 * Address book boundary. Scoped per user and fully async so swapping the
 * localStorage implementation for a backend is a one-line change in `index.ts`.
 */
export interface AddressService {
  list(userId: string): Promise<SavedAddress[]>
  getDefault(userId: string): Promise<SavedAddress | null>
  save(userId: string, input: SaveAddressInput): Promise<SavedAddress>
  setDefault(userId: string, addressId: string): Promise<void>
  remove(userId: string, addressId: string): Promise<void>
}

/** Structural equality over the delivery fields (ignores id/label/default). */
export function addressEquals(a: AddressFields, b: AddressFields): boolean {
  const norm = (value?: string) => (value ?? '').trim().toLowerCase()

  return (
    norm(a.postalCode) === norm(b.postalCode) &&
    norm(a.street) === norm(b.street) &&
    norm(a.number) === norm(b.number) &&
    norm(a.complement) === norm(b.complement) &&
    norm(a.neighborhood) === norm(b.neighborhood) &&
    norm(a.city) === norm(b.city) &&
    norm(a.state) === norm(b.state)
  )
}
