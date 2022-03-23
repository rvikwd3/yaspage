import styled from 'styled-components'


const PrimaryInput = ({ className, textColor, value }) => {

  return (
    <span className={className}>{value}</span>
  )
}

const PrimaryInput_Styled = styled(PrimaryInput)`
  width: 100%;
  text-align: center;
  border: 0;
  outline: 0;

  white-space: pre;

  // grid item
  grid-row: 1;

  // font
  font-weight: 700;
  font-size: clamp(50px, 4vw, 70px); // scale font size with width
  color: ${props => props.textColor};

  text-shadow: 2px 5px 10px rgba(0,0,0,0.5);
`

export default PrimaryInput_Styled