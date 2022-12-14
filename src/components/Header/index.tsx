import { CheckoutButton, HeaderContainer, Localization } from './styles'

import logo from '../../assets/logo.svg'
import { MapPin, ShoppingCart } from 'phosphor-react'
import { Link, NavLink } from 'react-router-dom'
import { useContext } from 'react'
import { OrderContext } from '../../contexts/OrderContext'

export function Header() {
  const { itemsCount } = useContext(OrderContext)
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
            <NavLink to="/order" title="my cart">
              <ShoppingCart size={22} weight="fill" />
            </NavLink>
            {showItemsCountTag && <small>{itemsCount}</small>}
          </CheckoutButton>
        </nav>
      </div>
    </HeaderContainer>
  )
}
