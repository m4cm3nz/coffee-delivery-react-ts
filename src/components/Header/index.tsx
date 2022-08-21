import { CheckoutButton, HeaderContainer, Localization } from './styles'

import logo from '../../assets/logo.svg'
import { MapPin, ShoppingCart } from 'phosphor-react'
import { Link, NavLink } from 'react-router-dom'
import { useContext } from 'react'
import { CartContext } from '../../contexts/CartContext'

export function Header() {
  const { itemsCount } = useContext(CartContext)
  const showItemsCountTag = itemsCount > 0

  return (
    <HeaderContainer>
      <div>
        <Link to="/">
          <img src={logo} alt=""></img>
        </Link>
        <nav>
          <Localization>
            <MapPin weight="fill" size={22} />
            Porto Alegre-RS
          </Localization>
          <CheckoutButton>
            <NavLink to="/checkout" title="checkout">
              <ShoppingCart size={22} weight="fill" />
            </NavLink>
            {showItemsCountTag && <small>{itemsCount}</small>}
          </CheckoutButton>
        </nav>
      </div>
    </HeaderContainer>
  )
}
