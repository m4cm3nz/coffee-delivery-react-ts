import { Link } from 'react-router-dom'
import { NotFoundContainer } from './styles'

export function NotFound() {
  return (
    <NotFoundContainer>
      <strong>404</strong>
      <h1>Página não encontrada</h1>
      <p>A página que você procura não existe ou foi movida.</p>
      <Link to="/">Voltar para o início</Link>
    </NotFoundContainer>
  )
}
