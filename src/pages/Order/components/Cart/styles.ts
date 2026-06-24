import styled from 'styled-components'
import { Button as BaseButton } from '../../../../components/Button'

export const CartContainer = styled.article`
  padding: 2.5rem;
  border-radius: 0.375rem 2.75rem 0.375rem 2.75rem;

  background: ${(props) => props.theme['base-card']};

  @media (max-width: 600px) {
    padding: 1.5rem;
  }

  ul {
    list-style: none;
  }

  > section {
    margin-bottom: 1.5rem;
  }

  footer {
    display: flex;
    flex-direction: column;
    gap: 0.5em;

    div {
      display: flex;
      justify-content: space-between;

      width: 100%;

      span:first-of-type {
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

export const EmptyCart = styled.p`
  padding: 1.5rem 0;
  text-align: center;
  color: ${(props) => props.theme['base-label']};
`

export const Button = styled(BaseButton).attrs({ $variant: 'primary' })`
  width: 100%;
`
