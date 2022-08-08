import styled from 'styled-components'
import background from '../../assets/background.png'

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
`

export const Cover = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 3.5rem;

  width: 100%;
  margin-bottom: 6.75rem;

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
`

export const BulletContainer = styled.ul`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: flex-start;

  height: 8rem;
  margin-top: 4.125rem;

  list-style: none;
`

export const Bullet = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.75rem;

  width: 50%;
  margin: 0 0 1.25rem 0;

  font-size: 1rem;

  span {
    width: 2rem;
    height: 2rem;
    padding: 0.5rem;
    border-radius: 999px;
    color: ${(props) => props.theme.white};
  }
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
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 2rem;

    list-style: none;
  }
`
