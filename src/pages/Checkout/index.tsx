import { CreditCard, MapPin, Timer } from '@phosphor-icons/react'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import {
  Bullet,
  BulletContainer,
  BulletIcon,
  Container,
  OrderInfo,
  Summary,
} from './styles'
import deliveryImage from '../../assets/delivery.svg'
import { OrderContext } from '../../contexts/OrderContext'
import formatValue from '../../util/formatValue'

export function Checkout() {
  const { lastOrder } = useContext(OrderContext)

  if (!lastOrder) {
    return <Navigate to="/" replace />
  }

  return (
    <Container>
      <OrderInfo>
        <h3>Uhu! Pedido confirmado</h3>
        <p>
          Pedido <strong>#{lastOrder.id}</strong> — agora é só aguardar que logo
          o café chegará até você
        </p>

        <BulletContainer>
          <Bullet>
            <BulletIcon $color="purple">
              <MapPin size={16} weight="fill" />
            </BulletIcon>
            <div>
              Entrega em
              <strong>{lastOrder.address}</strong>
            </div>
          </Bullet>
          <Bullet>
            <BulletIcon $color="yellow">
              <Timer size={16} weight="fill" />
            </BulletIcon>
            <div>
              Previsão de entrega
              <strong>{lastOrder.estimatedDelivery}</strong>
            </div>
          </Bullet>
          <Bullet>
            <BulletIcon $color="yellow-dark">
              <CreditCard size={16} weight="fill" />
            </BulletIcon>
            <div>
              Pagamento na entrega
              <strong>{lastOrder.paymentMethod}</strong>
            </div>
          </Bullet>
        </BulletContainer>

        <Summary>
          <h4>Resumo do pedido</h4>
          <ul>
            {lastOrder.items.map((item) => (
              <li key={item.id}>
                <span>
                  {item.amount}× {item.name}
                </span>
                <span>R$ {formatValue(item.price * item.amount)}</span>
              </li>
            ))}
          </ul>
          <div>
            <span>Entrega</span>
            <span>R$ {formatValue(lastOrder.deliveryTax)}</span>
          </div>
          <strong>
            <span>Total</span>
            <span>R$ {formatValue(lastOrder.total)}</span>
          </strong>
        </Summary>
      </OrderInfo>
      <img src={deliveryImage} alt="Entregador em uma moto levando o pedido" />
    </Container>
  )
}
