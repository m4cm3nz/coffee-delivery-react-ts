import { createLocalAddressService } from './localAddressService'

export * from './types'

/**
 * Composition root for the address book. Swap this line for an API-backed
 * implementation when the backend is defined — no consumer changes required.
 */
export const addressService = createLocalAddressService()
