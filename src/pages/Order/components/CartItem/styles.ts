import styled from 'styled-components'

export const CartItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  gap: 1.25rem;

  padding: 0 0 1.5rem 0.25rem;
  margin-bottom: 1.5rem;

  border-bottom: 1px solid ${(props) => props.theme['base-button']};

  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: 0;
  }

  img {
    width: 4rem;
    height: 4rem;
    flex-shrink: 0;
  }
`

export const Details = styled.div`
  flex: 1;
  min-width: 0;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  h4 {
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.3;
    color: ${(props) => props.theme['base-subtitle']};
    overflow-wrap: break-word;
  }
`

export const Controls = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;

  gap: 0.5rem 1rem;
`

export const Price = styled.span`
  font-weight: 700;
  font-size: 1.25rem;
  white-space: nowrap;
  color: ${(props) => props.theme['base-title']};
`
