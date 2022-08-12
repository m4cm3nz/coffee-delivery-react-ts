import { ShoppingCart } from 'phosphor-react'
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

export function MenuItem({
  id,
  image,
  tags,
  name,
  description,
  price,
}: Coffee) {
  function handleAddToCart() {
    console.log(id)
  }

  const formattedPrice = formatValue(price)

  return (
    <MenuItemContainer>
      <Header>
        <img src={image} alt="expresso" />
        <section>
          {tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </section>
      </Header>
      <Section>
        <span>{name}</span>
        <p>{description}</p>
      </Section>
      <Footer>
        <span>
          <small>R$</small> <strong>{formattedPrice}</strong>
        </span>
        <InputNumber />
        <NavLink to="/checkout" title="checkout" onClick={handleAddToCart}>
          <ShoppingCart size={22} weight="fill" />
        </NavLink>
      </Footer>
    </MenuItemContainer>
  )
}
