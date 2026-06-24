import { describe, it, expect, beforeEach } from 'vitest'
import { createLocalAuthService } from './localAuthService'
import { AuthError } from './types'

const service = createLocalAuthService()

beforeEach(() => {
  localStorage.clear()
})

describe('localAuthService', () => {
  it('logs in with a valid e-mail and password, deriving a session', async () => {
    const session = await service.login({
      email: 'Maria.Silva@Example.com',
      password: 'secret',
    })

    expect(session.user).toEqual({
      id: 'maria.silva@example.com',
      name: 'Maria silva',
      email: 'maria.silva@example.com',
    })
    expect(session.token).toMatch(/^local\./)
  })

  it('rejects an invalid e-mail', async () => {
    await expect(
      service.login({ email: 'not-an-email', password: 'secret' }),
    ).rejects.toBeInstanceOf(AuthError)
  })

  it('rejects an empty password', async () => {
    await expect(
      service.login({ email: 'a@b.com', password: '' }),
    ).rejects.toBeInstanceOf(AuthError)
  })

  it('restores a persisted session and clears it on logout', async () => {
    await service.login({ email: 'a@b.com', password: 'secret' })
    expect(await service.restore()).not.toBeNull()

    await service.logout()
    expect(await service.restore()).toBeNull()
  })
})
