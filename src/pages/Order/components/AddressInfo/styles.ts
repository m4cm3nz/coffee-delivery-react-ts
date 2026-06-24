import styled from 'styled-components'

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

    margin-bottom: 1.5rem;
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

  header > svg {
    color: ${(props) => props.theme['yellow-dark']};
    flex-shrink: 0;
  }

  fieldset {
    display: flex;
    flex-direction: column;

    gap: 0.5rem;
    min-width: 0;

    border: 0;

    > div {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;

      gap: 0.75rem;
    }
  }
`

interface FieldProps {
  $width?: string
  $grow?: boolean
}

export const Field = styled.div<FieldProps>`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  min-width: 0;
  width: ${(props) => props.$width ?? 'auto'};
  flex: ${(props) => (props.$grow ? '1 1 10rem' : '0 1 auto')};
`

interface InputProps {
  $hasError?: boolean
}

export const Input = styled.input<InputProps>`
  width: 100%;
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid
    ${(props) =>
      props.$hasError ? props.theme.yellow : props.theme['base-button']};

  font-size: 14px;

  background: ${(props) => props.theme['base-input']};
  color: ${(props) => props.theme['base-text']};

  :focus {
    outline: 0;
    box-shadow: 0 0 0 2px ${(props) => props.theme['yellow-dark']};
  }
`

export const ErrorMessage = styled.span`
  min-height: 0.875rem;
  padding-left: 0.25rem;

  font-size: 0.75rem;
  line-height: 1;
  color: ${(props) => props.theme.yellow};
`

export const Status = styled.span`
  min-height: 0.875rem;
  padding-left: 0.25rem;

  font-size: 0.75rem;
  line-height: 1;
  color: ${(props) => props.theme['base-label']};
`
