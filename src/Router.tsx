import { Route, Routes } from 'react-router-dom'
import { DefaultLayout } from './layouts/DefaultLayout'
import { Order } from './pages/Order'
import { Home } from './pages/Home'
import { Checkout } from './pages/Checkout'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/order" element={<Order />} />
        <Route path="/checkout" element={<Checkout />} />
      </Route>
    </Routes>
  )
}
