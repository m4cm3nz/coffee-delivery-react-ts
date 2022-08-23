import { MapPin, Timer } from 'phosphor-react'
import { defaultTheme } from '../../styles/themes/default'
import { Bullet, BulletContainer, Container, OrderInfo } from './styles'
import delivery from '../../assets/delivery.svg'
import { useContext } from 'react'
import { CartContext, PaymentMethods } from '../../contexts/CartContext'

export function OrderConfirmed() {
  const theme = defaultTheme

  const { paymentMethod, deliveryAddress } = useContext(CartContext)

  return (
    <Container>
      <OrderInfo>
        <h3>Uhu! Pedido confirmado</h3>
        <p>Agora é só aguardar que logo o café chegará até você</p>
        <BulletContainer>
          <Bullet>
            <span style={{ background: theme.purple }}>
              <MapPin size={16} weight="fill" />
            </span>
            <div>
              Entrega em
              <strong>{deliveryAddress}</strong>
            </div>
          </Bullet>
          <Bullet>
            <span style={{ background: theme.yellow }}>
              <Timer size={16} weight="fill" />
            </span>
            <div>
              Previsão de entrega
              <strong>20 min - 30 min</strong>
            </div>
          </Bullet>
          <Bullet>
            <span style={{ background: theme['yellow-dark'] }}>
              <MapPin size={16} weight="fill" />
            </span>
            <div>
              Pagamento na entrega
              <strong>{PaymentMethods[paymentMethod!]}</strong>
            </div>
          </Bullet>
        </BulletContainer>
      </OrderInfo>
      <img src={delivery} alt="um lindo copo de café"></img>
    </Container>
  )
}
