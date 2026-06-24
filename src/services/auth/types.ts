export interface User {
  id: string
  name: string
  email: string
}

export interface Session {
  user: User
  token: string
}

export interface Credentials {
  email: string
  password: string
}

/**
 * Authentication boundary. The whole app talks to this interface, never to a
 * concrete implementation — so swapping the localStorage version for a real
 * backend (fetch + JWT) is a one-line change in `index.ts`, with no consumer
 * touched. Every method is async to match a network round-trip.
 */
export interface AuthService {
  login(credentials: Credentials): Promise<Session>
  logout(): Promise<void>
  restore(): Promise<Session | null>
}

export class AuthError extends Error {}
