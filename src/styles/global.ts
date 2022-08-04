import { createGlobalStyle } from 'styled-components'
export const GlobalStyle = createGlobalStyle`
* {
    margin:0;
    padding:0;
    box-sizing: border-box;
}

body {
    background: #FFFFFf;
    -webkit-font-smoothing: antialiased;
}

body, input, text-area, p, button{
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 1rem;
    line-height: 130%;
    color: ${(props) => props.theme['base-text']};
}

body::-webkit-scrollbar {
  width: 0.3em;
}
 
:focus {
    outline: 0;
    box-shadow: 0 0 0 2px ${(props) => props.theme['purple-dark']};
}

::selection{
    color: ${(props) => props.theme.white};;
    background-color: ${(props) => props.theme['purple-dark']};
}
`
