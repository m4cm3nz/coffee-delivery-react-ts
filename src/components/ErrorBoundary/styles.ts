import styled from 'styled-components'

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;

  min-height: 60vh;
  padding: 3rem 1.5rem;
  text-align: center;

  strong {
    font-family: 'Baloo 2', cursive;
    font-size: 2.5rem;
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

  button {
    margin-top: 0.5rem;
    padding: 0.75rem 1.5rem;
    border: 0;
    border-radius: 6px;

    background: ${(props) => props.theme.yellow};
    color: ${(props) => props.theme.white};
    font-weight: 700;
    text-transform: uppercase;
    font-size: 0.875rem;
    cursor: pointer;

    transition: background 0.15s;

    &:hover {
      background: ${(props) => props.theme['yellow-dark']};
    }
  }
`
