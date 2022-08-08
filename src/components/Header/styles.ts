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

  div {
    display: flex;
    width: 100%;
    /* max-width: 83%; */
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
  /* padding: 0.5rem; */
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
  a {
    padding: 0.5rem;
    height: 2.375rem;
  }

  background: ${(props) => props.theme['yelloW-light']};

  svg {
    color: ${(props) => props.theme['yellow-dark']};
  }

  small {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    height: 1.25rem;
    width: 1.25rem;

    margin-right: -1.25rem;
    top: -1rem;
    left: -0.3rem;

    font-size: 0.75rem;
    font-weight: 700;

    border-radius: 999px;
    color: ${(props) => props.theme.white};
    background: ${(props) => props.theme['yellow-dark']};
  }
`
