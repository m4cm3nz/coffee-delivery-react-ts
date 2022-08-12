import styled from 'styled-components'

export const CheckoutContainer = styled.section`
  width: 100%;

  form {
    display: grid;
    grid-template-columns: 60% 40%;
    grid-template-rows: 1fr;

    gap: 2.5rem;

    padding: 2.5rem 8% 3rem 8%;

    main > header,
    aside > header {
      margin-bottom: 0.9375rem;

      text-align: left;
      font-family: 'Baloo 2';
      font-weight: 700;
      font-size: 18px;
    }
  }
`
