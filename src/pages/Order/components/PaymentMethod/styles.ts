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

  header > svg {
    color: ${(props) => props.theme.purple};
    flex-shrink: 0;
  }
`

export const Options = styled.fieldset`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  gap: 0.75rem;
  min-width: 0;
  margin: 0;
  padding: 0;
  border: 0;

  legend {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
    border: 0;
  }
`

export const HiddenRadio = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: 0;
  opacity: 0;
`

interface OptionProps {
  $selected: boolean
}

export const Option = styled.label<OptionProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  flex: 1 1 12rem;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid
    ${(props) => (props.$selected ? props.theme.purple : 'transparent')};

  background: ${(props) =>
    props.$selected
      ? props.theme['purple-light']
      : props.theme['base-button']};
  color: ${(props) => props.theme['base-text']};

  text-transform: uppercase;
  font-size: 0.75rem;
  line-height: 1.6;
  cursor: pointer;

  transition:
    background 0.15s,
    border-color 0.15s;

  svg {
    color: ${(props) => props.theme.purple};
  }

  &:hover {
    background: ${(props) => props.theme['base-hover']};
  }

  &:has(input:focus-visible) {
    box-shadow: 0 0 0 2px ${(props) => props.theme['yellow-dark']};
  }
`
