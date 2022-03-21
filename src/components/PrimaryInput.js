import styled from 'styled-components'

const PrimaryInput = styled.input`
  width: 100%;
  text-align: center;
  background: transparent;
  border: 0;
  outline: 0;

  // grid item
  grid-row: 1;

  // font
  font-weight: 700;
  font-size: clamp(50px, 4vw, 70px); // scale font size with width
  color: ${props => props.textColor};

  // hide input caret
  caret-color: transparent;

  text-shadow: 2px 5px 7px rgba(0,0,0,0.6);
`

export default PrimaryInput