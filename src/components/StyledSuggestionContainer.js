import { useEffect, useState } from 'react'
import styled from 'styled-components'

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

    // google search suggestions
    // todo

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

  useEffect(() => {
    /* each render make a list of suggestions to show */
    const suggestions = getSuggestionsForInput(primaryInput)

    setSuggestionsToShow(suggestions)

    // if a matchingCommand exists, set primary input text to its hex color
    suggestions[0]
      ? setPrimaryTextColor(suggestions[0].hex.primary)
      : setPrimaryTextColor('white')
  }, [primaryInput])

  if (suggestionsToShow.length === 0) return null

  return (
    <div className={className}>
      {suggestionsToShow.map(suggestion => (
        <StyledSuggestion
          key={suggestion.content}
          content={suggestion.content}
          iconUrl={suggestion.iconUrl}
          url={suggestion.url}
          hex={ suggestion.hex || '' }  // if hex isn't in the suggestion give falsey empty string
        />
      ))}
    </div>
  )
}

const StyledSuggestionContainer = styled(SuggestionContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;

  width: 33%;
  padding: 15px;
  border-radius: 50px;
  margin: auto;
  background-color: rgb(0,0,0,0.3);
  box-shadow: 1px 4px 10px rgba(0,0,0,0.1);

  // grid item
  grid-row: 2;
`

export default StyledSuggestionContainer