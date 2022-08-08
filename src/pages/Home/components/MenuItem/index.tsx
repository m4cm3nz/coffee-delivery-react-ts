import { ShoppingCart } from 'phosphor-react'
import { NavLink } from 'react-router-dom'
import expresso from '../../../../assets/coffee/expresso.svg'
import { InputNumber } from '../../../../components/InputNumber'

import { MenuItemContainer, Header, Footer, Section } from './styles'

export function MenuItem() {
  return (
    <MenuItemContainer>
      <Header>
        <img src={expresso} alt="expresso" />
        <section>
          <span>tradicional</span>
          <span>com leite</span>
        </section>
      </Header>
      <Section>
        <span>Expresso Tradicional</span>
        <p>O tradicional café feito com água quente e grãos moídos</p>
      </Section>
      <Footer>
        <span>
          <small>R$</small> <strong>9,90</strong>
        </span>
        <InputNumber />
        <NavLink to="/checkout" title="checkout">
          <ShoppingCart size={22} weight="fill" />
        </NavLink>
      </Footer>
    </MenuItemContainer>
  )
}
