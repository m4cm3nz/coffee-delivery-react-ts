import {
  CheckoutButton,
  HeaderContainer,
  Localization,
  SignInLink,
  UserArea,
} from './styles'

import logo from '../../assets/logo.svg'
import { MapPin, ShoppingCart, SignIn, SignOut } from '@phosphor-icons/react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { OrderContext } from '../../contexts/OrderContext'
import { useAuth } from '../../contexts/AuthContext'

export function Header() {
  const { itemsCount } = useContext(OrderContext)
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const showItemsCountTag = itemsCount > 0
  const firstName = user?.name.split(' ')[0]

  async function handleSignOut() {
    await logout()
    navigate('/')
  }

  return (
    <HeaderContainer>
      <div>
        <Link to="/" title="Página inicial">
          <img src={logo} alt="Coffee Delivery" />
        </Link>
        <nav>
          <Localization>
            <MapPin weight="fill" size={22} />
            <span>Porto Alegre-RS</span>
          </Localization>
          <CheckoutButton>
            <NavLink
              to="/order"
              title="Ver carrinho"
              aria-label={`Ver carrinho com ${itemsCount} ${
                itemsCount === 1 ? 'item' : 'itens'
              }`}
            >
              <ShoppingCart size={22} weight="fill" />
            </NavLink>
            {showItemsCountTag && <small>{itemsCount}</small>}
          </CheckoutButton>
          {isAuthenticated ? (
            <UserArea>
              <span title={user?.email}>{firstName}</span>
              <button type="button" onClick={handleSignOut} aria-label="Sair">
                <SignOut size={20} />
              </button>
            </UserArea>
          ) : (
            <SignInLink to="/login">
              <SignIn size={18} />
              Entrar
            </SignInLink>
          )}
        </nav>
      </div>
    </HeaderContainer>
  )
}
