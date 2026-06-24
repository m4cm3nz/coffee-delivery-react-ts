import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { authService, Credentials, Session, User } from '../services/auth'

export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated'

interface AuthContextType {
  user: User | null
  status: AuthStatus
  isAuthenticated: boolean
  login: (credentials: Credentials) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext({} as AuthContextType)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSession] = useState<Session | null>(null)
  const [status, setStatus] = useState<AuthStatus>('loading')

  useEffect(() => {
    let active = true

    authService.restore().then((restored) => {
      if (!active) return
      setSession(restored)
      setStatus(restored ? 'authenticated' : 'unauthenticated')
    })

    return () => {
      active = false
    }
  }, [])

  const login = useCallback(async (credentials: Credentials) => {
    const next = await authService.login(credentials)
    setSession(next)
    setStatus('authenticated')
  }, [])

  const logout = useCallback(async () => {
    await authService.logout()
    setSession(null)
    setStatus('unauthenticated')
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user: session?.user ?? null,
        status,
        isAuthenticated: session !== null,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext)
}
