import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { DefaultLayout } from './layouts/DefaultLayout'

const Home = lazy(() =>
  import('./pages/Home').then((m) => ({ default: m.Home })),
)
const Order = lazy(() =>
  import('./pages/Order').then((m) => ({ default: m.Order })),
)
const Checkout = lazy(() =>
  import('./pages/Checkout').then((m) => ({ default: m.Checkout })),
)
const NotFound = lazy(() =>
  import('./pages/NotFound').then((m) => ({ default: m.NotFound })),
)

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<Home />} />
        <Route path="order" element={<Order />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
