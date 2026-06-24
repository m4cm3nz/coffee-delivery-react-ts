import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../../components/Header'
import { Loading } from '../../components/Loading'
import { LayoutContainer } from './styles'

export function DefaultLayout() {
  return (
    <LayoutContainer>
      <Header />
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    </LayoutContainer>
  )
}
