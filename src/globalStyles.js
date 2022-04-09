import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`

  *, *::before, *::after {
    box-sizing: border-box;
  }

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

  #upcoming-matches-container:hover ~ #upcoming-matches-header {
    opacity: 1;
    top: -40px;
    transition: top 0.5s cubic-bezier(.35,1.23,.71,1.15), opacity 0.6s;
  }

  #upcoming-matches-container:hover #upcoming-matches-minimize {
    opacity: 1;
    transition: transform 0.2s, opacity 0.4s;
  }

  .thumb-vertical {
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 15px;
    transition: box-shadow 200ms;
  }

  .thumb-vertical:hover {
    box-shadow: 0 0 1rem 0 rgba(255, 255, 255, 0.4);
    transition: box-shadow 200ms;
  }

  .containerFade-enter {
    opacity: 0;
  }

  .containerFade-appear {
    opacity: 0;
  }

  .containerFade-enter-active {
    opacity: 1;
  }

  .containerFade-appear-active {
    opacity: 1;
  }

  .containerFade-exit {
    opacity: 1;
  }

  .containerFade-exit-active {
    opacity: 0;
  }
  
  .containerFade-exit-done {
    opacity: 0;
  }

  .containerFade-enter-active,
  .containerFade-appear-active,
  .containerFade-exit-active {
    transition: opacity 230ms;
  }

  .sk-cube-grid {
    width: 40px;
    height: 40px;
    margin: 100px auto;
    }

  .sk-cube-grid .sk-cube {
    width: 33%;
    height: 33%;
    background-color: rgba(255, 255, 255, 0.8);
    float: left;
    -webkit-animation: sk-cubeGridScaleDelay 1.5s infinite ease-in-out;
            animation: sk-cubeGridScaleDelay 1.5s infinite ease-in-out; 
    }
  .sk-cube-grid .sk-cube1 {
    -webkit-animation-delay: 0.2s;
            animation-delay: 0.2s; }
  .sk-cube-grid .sk-cube2 {
    -webkit-animation-delay: 0.3s;
            animation-delay: 0.3s; }
  .sk-cube-grid .sk-cube3 {
    -webkit-animation-delay: 0.4s;
            animation-delay: 0.4s; }
  .sk-cube-grid .sk-cube4 {
    -webkit-animation-delay: 0.1s;
            animation-delay: 0.1s; }
  .sk-cube-grid .sk-cube5 {
    -webkit-animation-delay: 0.2s;
            animation-delay: 0.2s; }
  .sk-cube-grid .sk-cube6 {
    -webkit-animation-delay: 0.3s;
            animation-delay: 0.3s; }
  .sk-cube-grid .sk-cube7 {
    -webkit-animation-delay: 0s;
            animation-delay: 0s; }
  .sk-cube-grid .sk-cube8 {
    -webkit-animation-delay: 0.1s;
            animation-delay: 0.1s; }
  .sk-cube-grid .sk-cube9 {
    -webkit-animation-delay: 0.2s;
            animation-delay: 0.2s; }

  @-webkit-keyframes sk-cubeGridScaleDelay {
    0%, 70%, 100% {
      -webkit-transform: scale3D(1, 1, 1);
              transform: scale3D(1, 1, 1);
    } 35% {
      -webkit-transform: scale3D(0, 0, 1);
              transform: scale3D(0, 0, 1); 
    }
    }

  @keyframes sk-cubeGridScaleDelay {
    0%, 70%, 100% {
      -webkit-transform: scale3D(1, 1, 1);
              transform: scale3D(1, 1, 1);
    } 35% {
      -webkit-transform: scale3D(0, 0, 1);
              transform: scale3D(0, 0, 1);
    } 
  }
`

export default GlobalStyle