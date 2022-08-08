import { Trash } from 'phosphor-react'
import expresso from '../../../../assets/coffee/expresso.svg'

import { InputNumber } from '../../../../components/InputNumber'

import { Button, CartItemContainer } from './styles'

export function CartItem() {
  return (
    <CartItemContainer>
      <img src={expresso} alt="expresso" />
      <div>
        <h4>Expresso Tradicional</h4>
        <div>
          <InputNumber />
          <Button>
            <Trash size={16} />
            Remover
          </Button>
        </div>
      </div>
      <label>R$ 29,70</label>
    </CartItemContainer>
  )
}
