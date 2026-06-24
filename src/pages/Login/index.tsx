import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import * as zod from 'zod'
import { useAuth } from '../../contexts/AuthContext'
import {
  ErrorMessage,
  Field,
  Form,
  Input,
  LoginContainer,
  Submit,
  SubmitError,
} from './styles'

const loginSchema = zod.object({
  email: zod.string().email('Informe um e-mail válido'),
  password: zod.string().min(4, 'Mínimo de 4 caracteres'),
})

type LoginData = zod.infer<typeof loginSchema>

export function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from ?? '/'

  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  async function handleLogin(data: LoginData) {
    setSubmitError(null)
    try {
      await login(data)
      navigate(from, { replace: true })
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : 'Não foi possível entrar.',
      )
    }
  }

  return (
    <LoginContainer>
      <h2>Entrar</h2>
      <p>Use qualquer e-mail e senha — a autenticação é simulada por enquanto.</p>

      <Form onSubmit={handleSubmit(handleLogin)} noValidate>
        <Field>
          <label htmlFor="email">E-mail</label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="voce@exemplo.com"
            $hasError={!!errors.email}
            {...register('email')}
          />
          <ErrorMessage>{errors.email?.message}</ErrorMessage>
        </Field>

        <Field>
          <label htmlFor="password">Senha</label>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••"
            $hasError={!!errors.password}
            {...register('password')}
          />
          <ErrorMessage>{errors.password?.message}</ErrorMessage>
        </Field>

        {submitError && <SubmitError role="alert">{submitError}</SubmitError>}

        <Submit type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Entrando…' : 'Entrar'}
        </Submit>
      </Form>
    </LoginContainer>
  )
}
