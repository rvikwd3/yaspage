import styled from 'styled-components'

const Icon = ({ src }) => {
  const style = {
    width: '32px',
    height: '32px',
    objectFit: 'scale-down'
  }

  return (
    <img
      src={ require(`../assets/${src}`) }
      style={style}
    />
  )
}

const StyledIcon = styled(Icon)`
  border: solid 2px white;
`

export default StyledIcon