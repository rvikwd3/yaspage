import { useEffect, useState, useMemo } from 'react'
import styled from 'styled-components'

import useKeydownCatcher from '../hooks/useKeydownCatcher'

import suggestionsKeyEventHandler from '../utils/suggestionsKeyEventHandler'
import commands from '../commands'
import defaultSuggestions from '../suggestionDefaults'


import StyledSuggestion from './Suggestion'


// get interface input text
// show suggestions
//    suggestion order: 
//      1. commands
//      2. search suggestions
const SuggestionContainer = ({ className, primaryInput, setPrimaryTextColor }) => {

  const [suggestionsToShow, setSuggestionsToShow] = useState([])
  const [highlightIndex, setHighlightIndex] = useState(0)
  const keydownEvent = useKeydownCatcher()

  const getSuggestionsForInput = (primaryInput) => {
    if (primaryInput === '') return []   // dont look for suggestions when empty input
    let suggestions = []

    // search commands
    const matchingCommand = commands.find(command =>
      command.key === primaryInput
    )

    if (matchingCommand) {
      const commandSuggestion = {
        content: matchingCommand.name,
        iconUrl: matchingCommand.iconUrl,
        hex: matchingCommand.hex,
        url: matchingCommand.url
      }
      suggestions = suggestions.concat(commandSuggestion)
    }

    // config default suggestions based on keywords
    const matchingDefaultSuggestion = defaultSuggestions.find(suggestion =>
      suggestion.key === primaryInput
    )

    if (matchingDefaultSuggestion) {
      // add each suggestion name in list to suggestions
      matchingDefaultSuggestion.suggestions.map(suggestion =>
        suggestions = suggestions.concat({
          content: suggestion.name,
          url: suggestion.url
        })
      )
    }
    return suggestions
  }

  // Update suggestions each time primary input changes
  useEffect(() => {
    // set combined suggestions to show
    const suggestions = getSuggestionsForInput(primaryInput)
    setSuggestionsToShow(suggestions)

    // reset highlightIndex
    setHighlightIndex(0)

    // if a matchingCommand exists, set primary input text to its hex color
    suggestions[0]
      ? setPrimaryTextColor(suggestions[0].hex.primary)
      : setPrimaryTextColor('white')
  }, [primaryInput])

  // Perform keydown action on each keypress
  useEffect(() => {
    const actionOnKeydown = suggestionsKeyEventHandler(keydownEvent, highlightIndex, setHighlightIndex, suggestionsToShow, setSuggestionsToShow)
    console.log('suggestionHandler', actionOnKeydown)
    if (actionOnKeydown) {
      actionOnKeydown()
    }
  }, [keydownEvent])

  if (suggestionsToShow.length === 0) return null
  return (
    <div className={className}>
      {suggestionsToShow.map(suggestion => (
        <StyledSuggestion
          key={suggestion.content}
          content={suggestion.content}
          iconUrl={suggestion.iconUrl}
          url={suggestion.url}
          highlight={suggestion.highlight}
          hex={suggestion.hex || ''}  // if hex isn't in the suggestion give falsey empty string
        />
      ))}
    </div>
  )
}

const StyledSuggestionContainer = styled(SuggestionContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  width: 33%;
  padding: 15px;
  /* border-radius: 50px; */
  margin: auto;

  z-index: 10;
  /* background-color: rgb(0,0,0,0.23);
  box-shadow: 1px 4px 10px rgba(0,0,0,0.1); */

  // grid item
  grid-row: 2;
`

export default StyledSuggestionContainer