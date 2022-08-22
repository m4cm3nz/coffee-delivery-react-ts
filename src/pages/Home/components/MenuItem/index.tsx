import { ShoppingCart } from 'phosphor-react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { InputNumber } from '../../../../components/InputNumber'
import formatValue from '../../../../util/formatValue'

import { MenuItemContainer, Header, Footer, Section } from './styles'

interface Item {
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
  item: Item
  onAddToCart: (item: CartItem) => void
}

export function MenuItem({ item, onAddToCart }: MenuItemProps) {
  const [cartItem, setCartItem] = useState({
    id: item.id,
    price: item.price,
    name: item.name,
    image: item.image,
    amount: 0,
  })

  function handleAddToCart() {
    onAddToCart(cartItem)
  }

  function handleAmountChange(value: number) {
    setCartItem({ ...cartItem, amount: value })
  }

  const formattedPrice = formatValue(item.price)

  return (
    <MenuItemContainer>
      <Header>
        <img src={item.image} alt={item.name} />
        <section>
          {item.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </section>
      </Header>
      <Section>
        <span>{item.name}</span>
        <p>{item.description}</p>
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
