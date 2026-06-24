import styled from 'styled-components'

export const NotFoundContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  min-height: 60vh;
  padding: 3rem 1.5rem;
  text-align: center;

  strong {
    font-family: 'Baloo 2', cursive;
    font-size: 4rem;
    line-height: 1;
    color: ${(props) => props.theme['yellow-dark']};
  }

  h1 {
    font-family: 'Baloo 2', cursive;
    font-size: 1.5rem;
    color: ${(props) => props.theme['base-title']};
  }

  p {
    color: ${(props) => props.theme['base-subtitle']};
  }

  a {
    margin-top: 1rem;
    padding: 0.75rem 1.5rem;
    border-radius: 6px;

    background: ${(props) => props.theme.purple};
    color: ${(props) => props.theme.white};
    font-weight: 700;
    text-transform: uppercase;
    font-size: 0.875rem;

    transition: background 0.15s;

    &:hover {
      background: ${(props) => props.theme['purple-dark']};
    }
  }
`
