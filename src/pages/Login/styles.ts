import styled from 'styled-components'

export const LoginContainer = styled.main`
  width: 100%;
  max-width: 26rem;
  margin: 0 auto;
  padding: 4rem 1.5rem 6rem;

  h2 {
    font-family: 'Baloo 2', cursive;
    font-weight: 800;
    font-size: 1.75rem;
    color: ${(props) => props.theme['base-title']};
  }

  > p {
    margin-top: 0.25rem;
    margin-bottom: 2rem;
    font-size: 0.875rem;
    color: ${(props) => props.theme['base-subtitle']};
  }
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  label {
    font-size: 0.875rem;
    color: ${(props) => props.theme['base-text']};
  }
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

  font-size: 0.875rem;
  background: ${(props) => props.theme['base-input']};
  color: ${(props) => props.theme['base-text']};

  :focus {
    outline: 0;
    box-shadow: 0 0 0 2px ${(props) => props.theme['yellow-dark']};
  }
`

export const ErrorMessage = styled.span`
  min-height: 0.875rem;
  font-size: 0.75rem;
  line-height: 1;
  color: ${(props) => props.theme.yellow};
`

export const SubmitError = styled.p`
  padding: 0.75rem;
  border-radius: 4px;
  background: ${(props) => props.theme['yellow-light']};
  color: ${(props) => props.theme['yellow-dark']};
  font-size: 0.8125rem;
`

export const Submit = styled.button`
  margin-top: 0.5rem;
  padding: 0.875rem;
  border: 0;
  border-radius: 6px;

  background: ${(props) => props.theme.yellow};
  color: ${(props) => props.theme.white};
  font-weight: 700;
  text-transform: uppercase;
  font-size: 0.875rem;
  cursor: pointer;

  transition: background 0.15s;

  &:hover:not(:disabled) {
    background: ${(props) => props.theme['yellow-dark']};
  }

  &:disabled {
    opacity: 0.7;
    cursor: progress;
  }
`
