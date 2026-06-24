import { AuthError, AuthService, Credentials, Session } from './types'

const SESSION_KEY = '@coffee-delivery:session'
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function deriveName(email: string): string {
  const handle = email.split('@')[0] ?? email
  const cleaned = handle.replace(/[._-]+/g, ' ').trim()
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1)
}

function persist(session: Session) {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  } catch {
    // Storage may be unavailable; the session still lives in memory.
  }
}

/**
 * localStorage-backed mock auth: accepts any well-formed e-mail + non-empty
 * password and issues a fake token. Replace with an API-backed implementation
 * when the backend is defined — no consumer changes required.
 */
export function createLocalAuthService(): AuthService {
  return {
    async login({ email, password }: Credentials): Promise<Session> {
      const normalizedEmail = email.trim().toLowerCase()

      if (!EMAIL_PATTERN.test(normalizedEmail) || password.length === 0) {
        throw new AuthError('Informe um e-mail e uma senha válidos.')
      }

      const session: Session = {
        user: {
          id: normalizedEmail,
          name: deriveName(normalizedEmail),
          email: normalizedEmail,
        },
        token: `local.${btoa(normalizedEmail)}.${Date.now()}`,
      }

      persist(session)
      return session
    },

    async logout(): Promise<void> {
      try {
        localStorage.removeItem(SESSION_KEY)
      } catch {
        // ignore
      }
    },

    async restore(): Promise<Session | null> {
      try {
        const stored = localStorage.getItem(SESSION_KEY)
        return stored ? (JSON.parse(stored) as Session) : null
      } catch {
        return null
      }
    },
  }
}
