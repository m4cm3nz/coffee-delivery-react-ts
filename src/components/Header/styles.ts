import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;

  position: sticky;
  top: 0;
  z-index: 10;

  width: 100%;
  height: 6.5rem;
  padding: 0 8% 0 8%;

  background: ${(props) => props.theme.white};

  @media (max-width: 920px) {
    padding: 0 6%;
  }

  @media (max-width: 600px) {
    height: 5rem;
    padding: 0 1.5rem;

    img {
      height: 2.25rem;
    }
  }

  > div {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 0.75rem;
  }

  nav {
    display: flex;
    align-items: center;
    justify-content: right;
    flex-wrap: wrap;

    width: 100%;

    gap: 0.5rem;
  }
`

export const BaseSpanContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
`

export const Localization = styled(BaseSpanContainer)`
  white-space: nowrap;
  gap: 0.25rem;
  padding: 0.5rem;

  font-size: 0.875rem;
  color: ${(props) => props.theme['purple-dark']};
  background: ${(props) => props.theme['purple-light']};

  svg {
    color: ${(props) => props.theme.purple};
  }

  @media (max-width: 600px) {
    span {
      display: none;
    }
  }
`

export const CheckoutButton = styled(BaseSpanContainer)`
  position: relative;

  background: ${(props) => props.theme['yellow-light']};

  a {
    display: flex;
    padding: 0.5rem;
    height: 2.375rem;
  }

  svg {
    color: ${(props) => props.theme['yellow-dark']};
  }

  small {
    position: absolute;
    top: -0.5rem;
    right: -0.5rem;

    display: flex;
    align-items: center;
    justify-content: center;

    height: 1.25rem;
    width: 1.25rem;

    font-size: 0.75rem;
    font-weight: 700;

    border-radius: 999px;
    color: ${(props) => props.theme.white};
    background: ${(props) => props.theme['yellow-dark']};
  }
`

export const SignInLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 0.375rem;

  height: 2.375rem;
  padding: 0 0.75rem;
  border-radius: 6px;
  white-space: nowrap;

  font-size: 0.875rem;
  color: ${(props) => props.theme['purple-dark']};
  background: ${(props) => props.theme['purple-light']};

  svg {
    color: ${(props) => props.theme.purple};
    transition: color 0.15s;
  }

  transition:
    background 0.15s,
    color 0.15s;

  &:hover {
    background: ${(props) => props.theme.purple};
    color: ${(props) => props.theme.white};

    svg {
      color: ${(props) => props.theme.white};
    }
  }
`

export const UserArea = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;

  height: 2.375rem;
  padding: 0 0.25rem 0 0.75rem;
  border-radius: 6px;
  background: ${(props) => props.theme['base-card']};

  > span {
    max-width: 8rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    font-size: 0.875rem;
    color: ${(props) => props.theme['base-title']};

    @media (max-width: 600px) {
      display: none;
    }
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 1.875rem;
    height: 1.875rem;
    border: 0;
    border-radius: 6px;

    background: transparent;
    cursor: pointer;
    color: ${(props) => props.theme['base-label']};

    transition:
      background 0.15s,
      color 0.15s;

    &:hover {
      background: ${(props) => props.theme['base-button']};
      color: ${(props) => props.theme['yellow-dark']};
    }
  }
`
