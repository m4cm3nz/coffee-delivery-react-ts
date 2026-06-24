import { useCallback, useEffect, useState } from 'react'
import {
  addressService,
  SaveAddressInput,
  SavedAddress,
} from '../services/address'

interface AddressBook {
  addresses: SavedAddress[]
  defaultAddress: SavedAddress | null
  loading: boolean
  save: (input: SaveAddressInput) => Promise<void>
  setDefault: (addressId: string) => Promise<void>
  remove: (addressId: string) => Promise<void>
}

/**
 * Loads and mutates the address book for a user (null = guest, no book).
 */
export function useAddressBook(userId: string | null): AddressBook {
  const [addresses, setAddresses] = useState<SavedAddress[]>([])
  const [loading, setLoading] = useState(true)

  const reload = useCallback(async () => {
    if (!userId) {
      setAddresses([])
      setLoading(false)
      return
    }
    setLoading(true)
    setAddresses(await addressService.list(userId))
    setLoading(false)
  }, [userId])

  useEffect(() => {
    reload()
  }, [reload])

  const save = useCallback(
    async (input: SaveAddressInput) => {
      if (!userId) return
      await addressService.save(userId, input)
      await reload()
    },
    [userId, reload],
  )

  const setDefault = useCallback(
    async (addressId: string) => {
      if (!userId) return
      await addressService.setDefault(userId, addressId)
      await reload()
    },
    [userId, reload],
  )

  const remove = useCallback(
    async (addressId: string) => {
      if (!userId) return
      await addressService.remove(userId, addressId)
      await reload()
    },
    [userId, reload],
  )

  const defaultAddress =
    addresses.find((address) => address.isDefault) ?? addresses[0] ?? null

  return { addresses, defaultAddress, loading, save, setDefault, remove }
}
