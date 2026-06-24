import styled, { DefaultTheme } from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: flex-start;

  gap: 6.375rem;
  width: 100%;

  padding: 5rem 8% 0 8%;

  img {
    max-width: 100%;
    height: auto;
  }

  @media (max-width: 920px) {
    flex-direction: column;
    align-items: center;
    gap: 2.5rem;
    padding: 3rem 6% 2rem 6%;

    img {
      max-width: 20rem;
    }
  }

  @media (max-width: 600px) {
    padding: 2rem 1.5rem;
  }
`

export const OrderInfo = styled.main`
  h3 {
    font-family: 'Baloo 2';
    font-weight: 800;
    font-size: 2rem;
    line-height: 130%;
    color: ${(props) => props.theme['yellow-dark']};
  }

  > p {
    font-size: 1.25rem;
    color: ${(props) => props.theme['base-subtitle']};
  }
`
export const BulletContainer = styled.ul`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: flex-start;

  width: 32.875rem;
  max-width: 100%;
  margin-top: 2.5rem;

  list-style: none;
`

export const Bullet = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;

  gap: 0.75rem;

  width: 100%;
  margin: 0 0 1.25rem 0;

  font-size: 1rem;

  div {
    display: flex;
    flex-direction: column;

    min-width: 0;
    overflow-wrap: break-word;
    word-break: break-word;
  }
`

export const BulletIcon = styled.span<{ $color: keyof DefaultTheme }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  width: 2rem;
  height: 2rem;
  border-radius: 999px;

  color: ${(props) => props.theme.white};
  background: ${(props) => props.theme[props.$color]};
`
