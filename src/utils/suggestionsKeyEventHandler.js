import { googleSearchBuildQuery } from './googleSearchBuildQuery'
import commands from '../commands'

const suggestionsKeyEventHandler = (event, input, hlIndex, setHlIndex, suggestions, setSuggestions) => {
  if (!event) return null

  // Don't mutate suggestions state directly
  // instead replace suggestions using setSuggestions
  const immutableUpdateSuggestionsHighlight = (oldHlIndex, newHlIndex) => {
    console.log('immutable oldind', oldHlIndex, ' | newIndex', newHlIndex)
    let localSuggestionsCopy = [...suggestions]   // shallow copy of suggestions state
    let outgoingSuggestion = { ...localSuggestionsCopy[oldHlIndex - 1], highlight: false }  // modifying shallow copy of outgoing suggestion
    let incomingSuggestion = { ...localSuggestionsCopy[newHlIndex - 1], highlight: true }   // modifying shallow copy of incoming suggestion
    localSuggestionsCopy[oldHlIndex - 1] = outgoingSuggestion   // mutating shallow copy of outgoing suggestion
    localSuggestionsCopy[newHlIndex - 1] = incomingSuggestion   // mutating shallow copy of incoming suggestion
    setSuggestions([...localSuggestionsCopy])    // replace state with mutated shallow copy of state
  }

  const suggestionCmds = {
    'ArrowUp': () => {
      // move hlIndex up by one
      let newHlIndex = Math.max(hlIndex - 1, 1)
      if (newHlIndex !== hlIndex && suggestions.length > 0) {
        immutableUpdateSuggestionsHighlight(hlIndex, newHlIndex)
        setHlIndex(newHlIndex)
      }
    },
    'ArrowDown': () => {
      // move hlIndex down by one
      let newHlIndex = Math.min(hlIndex + 1, suggestions.length)
      if (newHlIndex !== hlIndex && suggestions.length > 0) {
        immutableUpdateSuggestionsHighlight(hlIndex, newHlIndex)
        setHlIndex(newHlIndex)
      }
    },
    'Enter': () => {
      if (hlIndex === 0) {  // on no keypress to highlight a suggestion
        // if matching command exists redirect to that
        const matchingCommand = commands.find(command => command.key.includes(input))
        matchingCommand
          ? window.location.href = matchingCommand.url  // if no highlight but there is command go to command url
          : window.location.href = googleSearchBuildQuery(input)  // if no matchingCommand redirect to google query
      }
      const highlightedSuggestion = suggestions.find(s => s.highlight)
      if (highlightedSuggestion) window.location.href = highlightedSuggestion.url
    }
  }

  const handler = suggestionCmds[event.key]

  return handler
}

export default suggestionsKeyEventHandler