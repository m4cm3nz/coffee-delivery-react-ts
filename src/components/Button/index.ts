import styled, { css } from 'styled-components'

type ButtonVariant = 'primary' | 'secondary'

interface ButtonProps {
  $variant?: ButtonVariant
  $selected?: boolean
}

const primaryStyles = css`
  background: ${(props) => props.theme.yellow};
  color: ${(props) => props.theme.white};

  font-weight: 700;
  font-size: 0.875rem;

  &:hover:not(:disabled) {
    background: ${(props) => props.theme['yellow-dark']};
  }

  &:disabled {
    background: ${(props) => props.theme['yellow-light']};
    cursor: not-allowed;
  }
`

const secondaryStyles = css<ButtonProps>`
  background: ${(props) =>
    props.$selected
      ? props.theme['purple-light']
      : props.theme['base-button']};
  color: ${(props) => props.theme['base-text']};
  border: 1px solid
    ${(props) => (props.$selected ? props.theme.purple : 'transparent')};

  font-size: 0.75rem;

  svg {
    color: ${(props) => props.theme.purple};
  }

  &:hover:not(:disabled) {
    background: ${(props) => props.theme['base-hover']};
  }
`

/**
 * Shared button. Use `$variant="primary"` for the main yellow CTA and
 * `secondary` for neutral/selectable actions (pass `$selected` to highlight).
 * Consumers can extend layout via `styled(Button)` (e.g. width, flex-grow).
 */
export const Button = styled.button<ButtonProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  gap: 0.75rem;

  border: 0;
  border-radius: 6px;
  padding: 0.75rem 1rem;

  line-height: 1.6;
  text-transform: uppercase;

  cursor: pointer;
  transition:
    background 0.15s,
    border-color 0.15s;

  ${(props) =>
    props.$variant === 'primary' ? primaryStyles : secondaryStyles}
`
