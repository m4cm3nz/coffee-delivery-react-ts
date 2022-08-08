import styled from 'styled-components'

export const AmountInput = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 4.5rem;
  border-radius: 6px;
  background: ${(props) => props.theme['base-button']};

  button {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 2.5rem;
    border: 0;

    background: transparent;
    cursor: pointer;
    color: ${(props) => props.theme['purple-dark']};
  }

  button:hover {
    color: ${(props) => props.theme.purple};
    background: ${(props) => props.theme['base-hover']};
  }

  input {
    width: 1.625rem;
    height: 2.5rem;
    padding: 0 0.5rem;
    border: 0;

    color: ${(props) => props.theme['base-title']};
    background: transparent;

    ::-webkit-inner-spin-button,
    ::-webkit-outer-spin-button {
      -webkit-appearance: none;
    }

    &::-webikit-calendar-picker-indicator {
      display: none !important;
    }

    &:focus {
      box-shadow: none;
      border-color: ${(props) => props.theme['base-title']};
    }
  }
`
