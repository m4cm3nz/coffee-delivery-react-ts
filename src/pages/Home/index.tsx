import { Bullet, BulletContainer, Cover, HomeContainer, Menu } from './styles'
import { Coffee, Package, ShoppingCart, Timer } from 'phosphor-react'
import { defaultTheme } from '../../styles/themes/default'
import home from '../../assets/home.svg'
import { MenuItem } from './components/MenuItem'
import { coffeeMenu } from '../../data/coffeeMenu'
import { OrderContext, Item } from '../../contexts/OrderContext'
import { useContext } from 'react'

export function Home() {
  const theme = defaultTheme

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
              <span style={{ background: theme['yellow-dark'] }}>
                <ShoppingCart size={16} weight="fill" />
              </span>
              Compra simples e segura
            </Bullet>
            <Bullet>
              <span style={{ background: theme.yellow }}>
                <Timer size={16} weight="fill" />
              </span>
              Entrega rápida e rastreada
            </Bullet>
            <Bullet>
              <span style={{ background: theme['base-text'] }}>
                <Package size={16} weight="fill" />
              </span>
              Embalagem mantém o café intacto
            </Bullet>
            <Bullet>
              <span style={{ background: theme.purple }}>
                <Coffee size={16} weight="fill" />
              </span>
              O café chega quentinho até você
            </Bullet>
          </BulletContainer>
        </div>
        <img src={home} alt="um lindo copo de café"></img>
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
