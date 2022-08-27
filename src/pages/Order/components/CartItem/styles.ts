import styled from 'styled-components'

export const CartItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;

  padding: 0 0 1.5rem 0.25rem;
  margin-bottom: 1.5rem;

  border-bottom: 1px solid ${(props) => props.theme['base-button']};

  img {
    width: 4rem;
    height: 4rem;
    margin-right: 1.25rem;
  }

  div {
    width: 12rem;
    display: flex;
    flex-direction: column;

    gap: 0.5rem;

    h4 {
      font-size: 1rem;
      font-weight: 400;
      color: ${(props) => props.theme['base-title']};
    }

    div {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      gap: 0.5rem;

      span > input,
      button {
        height: 2rem;
      }
    }
  }

  > label {
    width: 100%;
    text-align: right;

    font-weight: 700;
    font-size: 1rem;
  }
`
export const Button = styled.button`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  gap: 0.75rem;

  height: 2rem;
  border-radius: 6px;
  border: 0;
  padding: 16px;

  background: ${(props) => props.theme['base-button']};
  color: ${(props) => props.theme['base-text']};

  svg {
    color: ${(props) => props.theme.purple};
  }

  text-transform: uppercase;
  font-size: 0.75rem;
  line-height: 160%;

  :hover {
    background: ${(props) => props.theme['base-hover']};
    cursor: pointer;
  }
`
