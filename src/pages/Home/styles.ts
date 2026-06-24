import styled, { DefaultTheme } from 'styled-components'
import background from '../../assets/background.webp'

export const HomeContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  width: 100%;
  height: 34rem;
  padding: 5.875rem 8% 0 8%;

  background: url(${background}) center center;
  background-repeat: repeat-x;
  background-size: cover;

  @media (max-width: 920px) {
    height: auto;
    padding: 3rem 6% 0 6%;
  }

  @media (max-width: 600px) {
    padding: 2rem 1.5rem 0 1.5rem;
  }
`

export const Cover = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 3.5rem;

  width: 100%;
  margin-bottom: 6.75rem;

  img {
    max-width: 100%;
    height: auto;
  }

  h1 {
    font-family: 'Baloo 2', cursive;
    font-size: 3rem;
    font-weight: 800;
    line-height: 130%;
    color: ${(props) => props.theme['base-title']};
  }

  p {
    margin-top: 1rem;
    font-size: 1.25rem;
    color: ${(props) => props.theme['base-subtitle']};
  }

  @media (max-width: 920px) {
    flex-direction: column;
    align-items: center;
    gap: 2.5rem;
    margin-bottom: 3.5rem;
    text-align: center;

    img {
      order: -1;
      max-width: 18rem;
    }
  }

  @media (max-width: 600px) {
    h1 {
      font-size: 2rem;
    }

    p {
      font-size: 1rem;
    }
  }
`

export const BulletContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, max-content);
  gap: 1.25rem 2.5rem;

  margin-top: 4.125rem;

  list-style: none;

  @media (max-width: 920px) {
    margin-top: 2.5rem;
    justify-content: center;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`

export const Bullet = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.75rem;

  font-size: 1rem;
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

export const Menu = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  padding-bottom: 8rem;

  h3 {
    margin-bottom: 2.125rem;

    font-weight: 800;
    font-size: 2rem;
    font-family: 'Baloo 2', cursive;

    color: ${(props) => props.theme['base-subtitle']};
  }

  ul {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
    gap: 2.5rem 2rem;

    list-style: none;
  }

  li {
    display: flex;
    justify-content: center;
  }

  @media (max-width: 600px) {
    padding-bottom: 4rem;

    h3 {
      font-size: 1.5rem;
    }
  }
`
