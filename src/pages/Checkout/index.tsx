import { MapPin, Timer } from 'phosphor-react'
import { defaultTheme } from '../../styles/themes/default'
import { Bullet, BulletContainer, Container, OrderInfo } from './styles'
import deliveryImage from '../../assets/delivery.svg'
import { useContext } from 'react'
import { OrderContext } from '../../contexts/OrderContext'

export function Checkout() {
  const theme = defaultTheme

  const { delivery } = useContext(OrderContext)

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
              <strong>{delivery.address}</strong>
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
              <strong>{delivery.paymentMethod}</strong>
            </div>
          </Bullet>
        </BulletContainer>
      </OrderInfo>
      <img src={deliveryImage} alt="um lindo copo de café"></img>
    </Container>
  )
}
