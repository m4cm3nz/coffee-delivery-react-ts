import { Minus, Plus, ShoppingCart } from 'phosphor-react'
import { NavLink } from 'react-router-dom'
import expresso from '../../../../assets/coffee/expresso.svg'
import {
  MenuItemContainer,
  AmountInput,
  HeaderContainer,
  FooterContainer,
  SectionContainer,
} from './styles'

export function MenuItem() {
  return (
    <MenuItemContainer>
      <HeaderContainer>
        <img src={expresso} alt="expresso" />
        <section>
          <span>tradicional</span>
          <span>Com Leite</span>
        </section>
      </HeaderContainer>
      <SectionContainer>
        <span>Expresso Tradicional</span>
        <p>O tradicional café feito com água quente e grãos moídos</p>
      </SectionContainer>
      <FooterContainer>
        <span>
          <small>R$</small> <strong>9,90</strong>
        </span>
        <AmountInput>
          <button>
            <Minus size={14} weight="bold" />
          </button>
          <input
            type="number"
            id="amount"
            placeholder="0"
            step={1}
            min={0}
            max={9}
          />
          <button>
            <Plus size={14} weight="bold" />
          </button>
        </AmountInput>
        <NavLink to="/checkout" title="checkout">
          <ShoppingCart size={22} weight="fill" />
        </NavLink>
      </FooterContainer>
    </MenuItemContainer>
  )
}
