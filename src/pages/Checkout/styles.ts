import styled from 'styled-components'

export const CheckoutContainer = styled.section`
  display: flex;
  /* flex-wrap: wrap; */
  flex-direction: row;
  align-items: flex-start;
  justify-content: left;

  gap: 2.5rem;

  padding: 2.5rem 8% 3rem 8%;

  width: 100%;
`

export const CheckoutOptions = styled.main`
  width: 100%;

  max-width: 60%;

  > header {
    margin-bottom: 0.9375rem;

    text-align: left;
    font-family: 'Baloo 2';
    font-weight: 700;
    font-size: 18px;
  }
`

const FormSection = styled.section`
  padding: 2.5rem;
  border-radius: 6px;
  margin-bottom: 0.75rem;

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
`
export const AddressInfo = styled(FormSection)`
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

export const PaymentMethod = styled(FormSection)`
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

export const Button = styled.button`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  gap: 0.75rem;

  border-radius: 6px;
  border: 0;
  padding: 16px;

  background: ${(props) => props.theme['base-button']};
  color: ${(props) => props.theme['base-text']};

  text-transform: uppercase;
  font-size: 12px;
  line-height: 160%;

  :hover {
    background: ${(props) => props.theme['base-hover']};
    cursor: pointer;
  }
`

export const OrderConfirmation = styled.aside`
  width: 100%;

  max-width: 40%;

  > header {
    margin-bottom: 0.9375rem;

    text-align: left;
    font-family: 'Baloo 2';
    font-weight: 700;
    font-size: 18px;
  }
`
