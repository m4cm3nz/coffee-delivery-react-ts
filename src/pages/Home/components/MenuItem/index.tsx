import { ShoppingCart } from 'phosphor-react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { InputNumber } from '../../../../components/InputNumber'
import formatValue from '../../../../util/formatValue'

import { MenuItemContainer, Header, Footer, Section } from './styles'

interface Coffee {
  id: string
  price: number
  name: string
  description: string
  tags: string[]
  image: string
}

interface CartItem {
  id: string
  price: number
  name: string
  image: string
  amount: number
}

interface MenuItemProps {
  coffee: Coffee
  onAddToCart: (item: CartItem) => void
}

export function MenuItem({ coffee, onAddToCart }: MenuItemProps) {
  const [cartItem, setCartItem] = useState({
    id: coffee.id,
    price: coffee.price,
    name: coffee.name,
    image: coffee.image,
    amount: 0,
  })

  function handleAddToCart() {
    onAddToCart(cartItem)
  }

  function handleAmountChange(value: number) {
    setCartItem({ ...cartItem, amount: value })
  }

  const formattedPrice = formatValue(coffee.price)

  return (
    <MenuItemContainer>
      <Header>
        <img src={coffee.image} alt={coffee.name} />
        <section>
          {coffee.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </section>
      </Header>
      <Section>
        <span>{coffee.name}</span>
        <p>{coffee.description}</p>
      </Section>
      <Footer>
        <span>
          <small>R$</small> <strong>{formattedPrice}</strong>
        </span>
        <InputNumber onChange={handleAmountChange} value={0} />
        <NavLink to="/checkout" title="checkout" onClick={handleAddToCart}>
          <ShoppingCart size={22} weight="fill" />
        </NavLink>
      </Footer>
    </MenuItemContainer>
  )
}
