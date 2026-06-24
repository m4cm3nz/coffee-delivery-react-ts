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

export const SavedAddresses = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`

export const AddressCard = styled.div<{ $selected: boolean }>`
  display: flex;
  align-items: stretch;
  min-width: 0;
  flex: 1 1 14rem;

  border-radius: 6px;
  border: 1px solid
    ${(props) =>
      props.$selected ? props.theme.purple : props.theme['base-button']};
  background: ${(props) =>
    props.$selected ? props.theme['purple-light'] : props.theme.white};
  overflow: hidden;

  .select {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.125rem;

    padding: 0.625rem 0.75rem;
    border: 0;
    background: transparent;
    cursor: pointer;
    text-align: left;
  }

  .label {
    display: flex;
    align-items: center;
    gap: 0.25rem;

    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    color: ${(props) => props.theme['purple-dark']};

    svg {
      color: ${(props) => props.theme.yellow};
    }
  }

  .summary {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    font-size: 0.8125rem;
    color: ${(props) => props.theme['base-text']};
  }

  .actions {
    display: flex;
    align-items: center;
    padding-right: 0.25rem;

    button {
      display: flex;
      align-items: center;
      justify-content: center;

      width: 1.75rem;
      height: 1.75rem;
      border: 0;
      border-radius: 6px;

      background: transparent;
      cursor: pointer;
      color: ${(props) => props.theme['base-label']};

      transition:
        color 0.15s,
        background 0.15s;

      &:hover {
        background: ${(props) => props.theme['base-button']};
        color: ${(props) => props.theme['yellow-dark']};
      }
    }
  }
`

export const NewAddressButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  flex: 1 1 14rem;

  padding: 0.625rem 0.75rem;
  border-radius: 6px;
  border: 1px dashed ${(props) => props.theme['base-button']};

  background: transparent;
  cursor: pointer;

  font-size: 0.8125rem;
  color: ${(props) => props.theme['base-text']};

  transition:
    border-color 0.15s,
    color 0.15s;

  &:hover {
    border-color: ${(props) => props.theme.purple};
    color: ${(props) => props.theme['purple-dark']};
  }
`

export const SaveBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  margin-top: 1.25rem;
  padding-top: 1.25rem;
  border-top: 1px solid ${(props) => props.theme['base-button']};

  font-size: 0.875rem;
  color: ${(props) => props.theme['base-text']};

  label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
  }

  input[type='checkbox'] {
    width: 1rem;
    height: 1rem;
    accent-color: ${(props) => props.theme.purple};
    cursor: pointer;
  }

  .editing {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    font-size: 0.8125rem;
    color: ${(props) => props.theme['purple-dark']};

    button {
      padding: 0;
      border: 0;
      background: transparent;
      color: ${(props) => props.theme['base-label']};
      text-decoration: underline;
      cursor: pointer;
    }

    button:hover {
      color: ${(props) => props.theme['yellow-dark']};
    }
  }

  .save-options {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1rem 1.5rem;
    padding-left: 1.5rem;
  }

  select {
    padding: 0.375rem 0.5rem;
    border-radius: 4px;
    border: 1px solid ${(props) => props.theme['base-button']};

    background: ${(props) => props.theme['base-input']};
    color: ${(props) => props.theme['base-text']};
    cursor: pointer;
  }
`
