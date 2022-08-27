import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: flex-start;

  gap: 6.375rem;
  width: 100%;

  padding: 5rem 8% 0 8%;
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

  span {
    width: 2rem;
    height: 2rem;
    padding: 0.5rem;
    border-radius: 999px;
    color: ${(props) => props.theme.white};
  }

  div {
    display: flex;
    flex-direction: column;
  }
`
