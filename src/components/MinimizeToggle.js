import styled from 'styled-components'

const MinimizeToggle = ({ className, onClick }) => {
  return (
    <div
      className={className}
      onClick={onClick}
      id="upcoming-matches-minimize"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 448 512">
        <defs>
          <path id="chevron-down" d="M224 416c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L224 338.8l169.4-169.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-192 192C240.4 412.9 232.2 416 224 416z" />
        </defs>
        <g id="group">
          <use xlinkHref='#chevron-down' strokeWidth="20" pointerEvents="stroke" />
          <use className="use" xlinkHref="#chevron-down" />
        </g>
      </svg>
    </div>
  )
}

const MinimizeToggle_Styled = styled(MinimizeToggle)`
  position: absolute;
  top: 0.6em;
  left: 0.8em;

  z-index: 1;

  color: white;
  cursor: pointer;

  transform: translateY(0px);
  opacity: 0;
  transition: transform 0.5s, opacity 0.4s;

  &:hover {
    transform: translateY(3px);
  }
`

export default MinimizeToggle_Styled