import { CheckoutButton, HeaderContainer, Localization } from './styles'

import logo from '../../assets/logo.svg'
import { MapPin, ShoppingCart } from '@phosphor-icons/react'
import { Link, NavLink } from 'react-router-dom'
import { useContext } from 'react'
import { OrderContext } from '../../contexts/OrderContext'

export function Header() {
  const { itemsCount } = useContext(OrderContext)
  const showItemsCountTag = itemsCount > 0

  return (
    <HeaderContainer>
      <div>
        <Link to="/" title="Página inicial">
          <img src={logo} alt="Coffee Delivery" />
        </Link>
        <nav>
          <Localization>
            <MapPin weight="fill" size={22} />
            Porto Alegre-RS
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
        </nav>
      </div>
    </HeaderContainer>
  )
}
