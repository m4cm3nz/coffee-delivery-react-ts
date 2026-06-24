import styled from 'styled-components'
import { Button as BaseButton } from '../../../../components/Button'

export const SectionContainer = styled.section`
  padding: 2.5rem;
  border-radius: 6px;
  margin-bottom: 0.75rem;

  width: 100%;

  background: ${(props) => props.theme['base-card']};

  @media (max-width: 600px) {
    padding: 1.5rem;
  }

  header {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;

    margin-bottom: 2rem;
    width: 100%;

    h4 {
      font-weight: 400;
      font-size: 16px;
      color: ${(props) => props.theme['base-title']};
      margin-bottom: 0.25rem;
    }

    p {
      font-size: 14px;
    }
  }

  svg {
    color: ${(props) => props.theme.purple};
  }

  > div {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    gap: 0.75rem;
  }
`

export const Button = styled(BaseButton).attrs({ $variant: 'secondary' })`
  flex: 1 1 12rem;
`
