import styled from 'styled-components'

export const OrderContainer = styled.section`
  width: 100%;

  form {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    grid-template-rows: 1fr;

    gap: 2.5rem;

    padding: 2.5rem 8% 3rem 8%;

    main,
    aside {
      min-width: 0;
    }

    main > header,
    aside > header {
      margin-bottom: 0.9375rem;

      text-align: left;
      font-family: 'Baloo 2';
      font-weight: 700;
      font-size: 18px;
    }

    @media (max-width: 920px) {
      grid-template-columns: 1fr;
      gap: 2rem;
      padding: 2rem 6% 3rem 6%;
    }

    @media (max-width: 600px) {
      padding: 1.5rem 1.5rem 2.5rem 1.5rem;
    }
  }
`
