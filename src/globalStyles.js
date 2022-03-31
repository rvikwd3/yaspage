import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }  
  input, textarea, select{font-family: inherit;}

  body {
    font-family: "Poppins", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  &.containerFade-enter {
    opacity: 0;
  }

  &.containerFade-appear {
    opacity: 0;
  }

  &.containerFade-enter-active {
    opacity: 1;
  }

  &.containerFade-appear-active {
    opacity: 1;
  }

  &.containerFade-exit {
    opacity: 1;
  }

  &.containerFade-exit-active {
    opacity: 0;
  }
  
  &.containerFade-exit-done {
    opacity: 0;
  }

  &.containerFade-enter-active,
  &.containerFade-appear-active,
  &.containerFade-exit-active {
    transition: opacity 230ms;
  }
`

export default GlobalStyle