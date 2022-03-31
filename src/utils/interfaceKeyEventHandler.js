import { isControlKey } from "./isControlKey"

const interfaceKeyEventHandler = (event, input, setInput, setPage) => {
  if (!event) return null

  // dispatches based on keypress
  const inputCmds = {
    'nonEmpty': {
      'normal': {
        'non-control': () => setInput(prevInput => prevInput.concat(event.key)),
        'Backspace': () => setInput(prevInput => prevInput.slice(0, -1)),
        'Delete': () => setInput(''),
        'Escape': () => setPage('LANDING'),
      },
      'ctrl': {
        'Backspace': () => setInput(prevInput => prevInput.replace(/[\W]*\S+[\W]*$/, ''))
      }
    },
    'empty': {
      'normal': {
        'non-control': () => setInput(prevInput => prevInput.concat(event.key)),
        'Backspace': () => setPage('LANDING'),
        'Escape': () => setPage('LANDING'),
        'Enter': () => window.location.href = 'https://www.google.com',
      }
    }
  }

  const isInputEmpty = !!input ? 'nonEmpty' : 'empty'
  // console.log('InputNotEmpty: ', isInputNotEmpty, ' cmdisInputEmpty', cmdIsInputEmpty)

  const isCtrlKey = event.ctrlKey ? 'ctrl' : 'normal'
  // console.log('isCtrlKey', isCtrlKey)
  
  const isControl = isControlKey(event.key) ? event.key : 'non-control'
  // console.log('isControlKey: ', isControlKey(event.key) ? event.key : 'non-control')
  
  const handler = inputCmds?.[isInputEmpty]?.[isCtrlKey]?.[isControl]
  return handler
}

export default interfaceKeyEventHandler