import { ShoppingCart } from '@phosphor-icons/react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { InputNumber } from '../../../../components/InputNumber'
import formatValue from '../../../../util/formatValue'
import { Item } from '../../../../contexts/OrderContext'
import { Coffee } from '../../../../data/coffeeMenu'

import { MenuItemContainer, Header, Footer, Section, Price, Order } from './styles'

interface MenuItemProps {
  item: Coffee
  onAddToCart: (item: Item) => void
}

export function MenuItem({ item, onAddToCart }: MenuItemProps) {
  const [amount, setAmount] = useState(1)

  function handleAddToCart() {
    onAddToCart({
      id: item.id,
      price: item.price,
      name: item.name,
      image: item.image,
      amount,
    })
    setAmount(1)
  }

  const formattedPrice = formatValue(item.price)

  return (
    <MenuItemContainer>
      <Header>
        <img src={item.image} alt={item.name} loading="lazy" />
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
        <Price>
          <small>R$</small>
          <strong>{formattedPrice}</strong>
        </Price>
        <Order>
          <InputNumber
            onValueChange={setAmount}
            min={1}
            max={9}
            value={amount}
          />
          <NavLink
            to="/order"
            title="Adicionar ao carrinho"
            aria-label={`Adicionar ${item.name} ao carrinho`}
            onClick={handleAddToCart}
          >
            <ShoppingCart size={22} weight="fill" />
          </NavLink>
        </Order>
      </Footer>
    </MenuItemContainer>
  )
}
