import {
  Bullet,
  BulletContainer,
  BulletIcon,
  Cover,
  HomeContainer,
  Menu,
} from './styles'
import { Coffee, Package, ShoppingCart, Timer } from '@phosphor-icons/react'
import home from '../../assets/home.svg'
import { MenuItem } from './components/MenuItem'
import { coffeeMenu } from '../../data/coffeeMenu'
import { OrderContext, Item } from '../../contexts/OrderContext'
import { useContext } from 'react'

export function Home() {
  const { addItem } = useContext(OrderContext)

  function handleAddItemToCart(item: Item) {
    addItem(item)
  }

  return (
    <HomeContainer>
      <Cover>
        <div>
          <h1>Encontre o café perfeito para qualquer hora do dia</h1>
          <p>
            Com o Coffee Delivery você recebe seu café onde estiver, a qualquer
            hora
          </p>
          <BulletContainer>
            <Bullet>
              <BulletIcon $color="yellow-dark">
                <ShoppingCart size={16} weight="fill" />
              </BulletIcon>
              Compra simples e segura
            </Bullet>
            <Bullet>
              <BulletIcon $color="yellow">
                <Timer size={16} weight="fill" />
              </BulletIcon>
              Entrega rápida e rastreada
            </Bullet>
            <Bullet>
              <BulletIcon $color="base-text">
                <Package size={16} weight="fill" />
              </BulletIcon>
              Embalagem mantém o café intacto
            </Bullet>
            <Bullet>
              <BulletIcon $color="purple">
                <Coffee size={16} weight="fill" />
              </BulletIcon>
              O café chega quentinho até você
            </Bullet>
          </BulletContainer>
        </div>
        <img src={home} alt="Copo de café com grãos ao redor" />
      </Cover>
      <Menu>
        <h3>Nossos cafés</h3>
        <ul>
          {coffeeMenu.map((coffee) => (
            <li key={coffee.id}>
              <MenuItem item={coffee} onAddToCart={handleAddItemToCart} />
            </li>
          ))}
        </ul>
      </Menu>
    </HomeContainer>
  )
}
