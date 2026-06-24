import { MapPin, Timer } from '@phosphor-icons/react'
import {
  Bullet,
  BulletContainer,
  BulletIcon,
  Container,
  OrderInfo,
} from './styles'
import deliveryImage from '../../assets/delivery.svg'
import { useContext } from 'react'
import { OrderContext } from '../../contexts/OrderContext'

export function Checkout() {
  const { delivery } = useContext(OrderContext)

  return (
    <Container>
      <OrderInfo>
        <h3>Uhu! Pedido confirmado</h3>
        <p>Agora é só aguardar que logo o café chegará até você</p>
        <BulletContainer>
          <Bullet>
            <BulletIcon $color="purple">
              <MapPin size={16} weight="fill" />
            </BulletIcon>
            <div>
              Entrega em
              <strong>{delivery.address}</strong>
            </div>
          </Bullet>
          <Bullet>
            <BulletIcon $color="yellow">
              <Timer size={16} weight="fill" />
            </BulletIcon>
            <div>
              Previsão de entrega
              <strong>20 min - 30 min</strong>
            </div>
          </Bullet>
          <Bullet>
            <BulletIcon $color="yellow-dark">
              <MapPin size={16} weight="fill" />
            </BulletIcon>
            <div>
              Pagamento na entrega
              <strong>{delivery.paymentMethod}</strong>
            </div>
          </Bullet>
        </BulletContainer>
      </OrderInfo>
      <img
        src={deliveryImage}
        alt="Entregador em uma moto levando o pedido"
      />
    </Container>
  )
}
