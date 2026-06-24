import styled from 'styled-components'

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;

  position: sticky;
  top: 0;

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

  div {
    display: flex;
    width: 100%;
    gap: 0.75rem;
  }

  nav {
    display: flex;
    align-items: center;
    justify-content: right;

    width: 100%;

    gap: 0.75rem;
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
