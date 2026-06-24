import { LoadingContainer, Spinner } from './styles'

export function Loading() {
  return (
    <LoadingContainer role="status" aria-live="polite">
      <Spinner aria-hidden="true" />
      <span>Carregando…</span>
    </LoadingContainer>
  )
}
