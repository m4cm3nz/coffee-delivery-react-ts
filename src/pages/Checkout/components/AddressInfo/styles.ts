import styled from 'styled-components'

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

  header > svg {
    color: ${(props) => props.theme['yellow-dark']};
  }

  overflow: hidden;

  fieldset {
    display: flex;
    flex-direction: column;

    gap: 1rem;
    min-width: 0;

    margin-bottom: 0.75rem;
    border: 0;

    div {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;

      gap: 1rem;
    }
  }
`

export const Input = styled.input`
  flex: 1;
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme['base-button']};

  font-size: 14px;

  background: ${(props) => props.theme['base-input']};
  color: ${(props) => props.theme['base-text']};

  :focus {
    outline: 0;
    box-shadow: 0 0 0 2px ${(props) => props.theme['yellow-dark']};
  }
`
