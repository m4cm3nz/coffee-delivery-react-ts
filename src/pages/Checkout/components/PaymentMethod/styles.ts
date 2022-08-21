import styled, { css } from 'styled-components'

export const SectionContainer = styled.section`
  padding: 2.5rem;
  border-radius: 6px;
  margin-bottom: 0.75rem;

  width: 100%;

  background: ${(props) => props.theme['base-card']};

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

interface ButtonProps {
  isSelected: boolean
}

export const Button = styled.button<ButtonProps>`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  gap: 0.75rem;

  border-radius: 6px;
  border: 0;
  padding: 16px;

  background: ${(props) =>
    props.isSelected
      ? props.theme['purple-light']
      : props.theme['base-button']};

  ${(props) =>
    props.isSelected &&
    css`
      border: 2px solid ${props.theme.purple};
    `}

  color: ${(props) => props.theme['base-text']};

  text-transform: uppercase;
  font-size: 12px;
  line-height: 160%;

  :hover {
    background: ${(props) => props.theme['base-hover']};
    cursor: pointer;
  }
`
