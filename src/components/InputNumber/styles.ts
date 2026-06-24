import styled from 'styled-components'

export const AmountInput = styled.span`
  display: inline-grid;
  grid-template-columns: 1.75rem 1fr 1.75rem;
  align-items: center;

  width: 4.5rem;
  height: 2.5rem;
  border-radius: 6px;
  background: ${(props) => props.theme['base-button']};

  button {
    display: flex;
    align-items: center;
    justify-content: center;

    height: 100%;
    border: 0;

    background: transparent;
    cursor: pointer;
    color: ${(props) => props.theme['purple-dark']};

    transition: color 0.1s;
  }

  button:hover:not(:disabled) {
    color: ${(props) => props.theme.purple};
  }

  button[data-danger='true']:hover {
    color: ${(props) => props.theme['yellow-dark']};
  }

  button:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  span {
    text-align: center;
    font-size: 1rem;
    line-height: 1;
    font-variant-numeric: tabular-nums;

    color: ${(props) => props.theme['base-title']};
    user-select: none;
  }
`
