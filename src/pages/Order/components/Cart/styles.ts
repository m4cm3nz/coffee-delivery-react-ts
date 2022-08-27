import styled from 'styled-components'

export const CartContainer = styled.article`
  padding: 2.5rem;
  border-radius: 0.375rem 2.75rem 0.375rem 2.75rem;

  background: ${(props) => props.theme['base-card']};

  ul {
    list-style: none;
  }

  footer {
    display: flex;
    flex-direction: column;
    gap: 0.5em;

    div {
      display: flex;
      justify-content: space-between;

      width: 100%;

      label:first-of-type {
        font-size: 0.875rem;
      }

      strong {
        font-weight: 700;
        font-size: 1.25rem;
      }
    }

    button {
      margin-top: 1rem;
    }
  }
`

export const Button = styled.button`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  gap: 0.75rem;

  border-radius: 6px;
  border: 0;
  padding: 16px;
  width: 100%;

  background: ${(props) => props.theme.yellow};
  color: ${(props) => props.theme.white};

  text-transform: uppercase;
  font-size: 12px;
  font-weight: 700;
  font-size: 14px;

  line-height: 160%;

  :disabled {
    background: ${(props) => props.theme['yelloW-light']};
  }

  :not(:disabled):hover {
    background: ${(props) => props.theme['yellow-dark']};
    cursor: pointer;
  }
`
