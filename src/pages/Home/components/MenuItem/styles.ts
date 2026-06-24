import styled from 'styled-components'

export const MenuItemContainer = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  width: 16rem;
  min-height: 19.375rem;
  margin-top: 1.25rem;
  padding: 0 1.25rem 1.25rem 1.25rem;
  border-radius: 6px 2.25rem 6px 2.25rem;

  gap: 1.5rem;

  background: ${(props) => props.theme['base-card']};
`

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;

  img {
    width: 7.5rem;
    height: 7.5rem;
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

      background: ${(props) => props.theme['yellow-light']};
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
  justify-content: space-between;

  gap: 0.5rem;

  width: 100%;
`

export const Price = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.125rem;

  color: ${(props) => props.theme['base-text']};

  small {
    font-size: 0.875rem;
  }

  strong {
    font-weight: 800;
    font-size: 1.5rem;
    font-family: 'Baloo 2', cursive;
  }
`

export const Order = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;

  a {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 2.375rem;
    height: 2.375rem;
    border-radius: 6px;

    color: ${(props) => props.theme.white};
    background: ${(props) => props.theme['purple-dark']};

    transition: background 0.15s;

    &:hover {
      background: ${(props) => props.theme.purple};
    }
  }
`
