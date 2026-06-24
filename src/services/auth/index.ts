import { createLocalAuthService } from './localAuthService'

export * from './types'

/**
 * Composition root for authentication. To move to a real backend, swap this
 * single line for e.g. `createApiAuthService(import.meta.env.VITE_API_URL)`.
 */
export const authService = createLocalAuthService()
