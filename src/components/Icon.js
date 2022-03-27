import styled from 'styled-components'
import useImage from '../hooks/useImage'

const Icon = ({ src }) => {
  const { loading, error, image } = useImage(src)

  const style = {
    width: '32px',
    height: '32px',
    objectFit: 'scale-down'
  }

  if (error) {
    console.error(`Cannot load ${src} due to error: ${error}`);
    return null
  }

  return (
    <img
      src={image}
      loading='lazy'
      style={style}
    />
  )
}

const StyledIcon = styled(Icon)`
  border: solid 2px white;
`

export default StyledIcon