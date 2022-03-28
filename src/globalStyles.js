import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }  
  input, textarea, select{font-family: inherit;}

  body {
    font-family: "Poppins", sans-serif;
  }
`

export default GlobalStyle