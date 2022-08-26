import styled from 'styled-components'

export const MenuItemContainer = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  width: 16rem;
  height: 19.375rem;
  margin-top: 1.25rem;
  padding: 0 1.25rem 1.25rem 1.25rem;
  border-radius: 6px 2.25rem 6px 2.25rem;

  background: ${(props) => props.theme['base-card']};
`

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;

  img {
    margin-top: -1.25rem;
  }

  section {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;

    span {
      display: flex;
      align-items: center;

      height: 1.3125rem;
      padding: 4px 8px 4px 8px;
      border-radius: 100px;

      background: ${(props) => props.theme['yelloW-light']};
      color: ${(props) => props.theme['yellow-dark']};

      font-weight: 700;
      font-size: 0.625rem;
      text-transform: uppercase;
    }
  }
`

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 0.75rem;

  span {
    font-family: 'Baloo 2', cursive;
    font-size: 1.25rem;
  }

  p {
    text-align: center;
    color: ${(props) => props.theme['base-label']};
    font-size: 14px;
  }
`

export const Footer = styled.footer`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: right;

  gap: 0.5rem;

  width: 100%;

  span {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;

    gap: 2px;

    strong {
      width: 1.25rem;
      font-weight: 800;
      font-size: 1.5rem;
      font-family: 'Baloo 2', cursive;
    }
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 0.5rem;
    border-radius: 6px;

    width: 2.375rem;
    height: 2.375rem;

    color: ${(props) => props.theme.white};
    background: ${(props) => props.theme['purple-dark']};

    :hover {
      background: ${(props) => props.theme.purple};
    }
  }
`
