import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  min-height: 50vh;
  padding: 3rem 1.5rem;

  color: ${(props) => props.theme['base-label']};
`

export const Spinner = styled.span`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  border: 3px solid ${(props) => props.theme['base-button']};
  border-top-color: ${(props) => props.theme.yellow};

  animation: ${spin} 0.8s linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation-duration: 2s;
  }
`
