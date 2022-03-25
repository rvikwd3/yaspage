import { useEffect, useState } from 'react'
import styled from 'styled-components'

import commands from '../commands'
import defaultSuggestions from '../suggestionDefaults'
import useKeydownCatcher from '../hooks/useKeydownCatcher'
import suggestionsKeyEventHandler from '../utils/suggestionsKeyEventHandler'
import buildAutocompleteSuggestions from '../utils/buildAutocompleteSuggestions'
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

  const callAutocompleteScript = (componentCallback) => {
    const script = document.createElement('script');
    const url = process.env.DDG_AUTOCOMPLETE_URL + primaryInput
    script.src = url
    script.defer = true;
    document.head.appendChild(script);

    if (componentCallback && typeof window != "undefined") {   // in case SSR server side rendering
      window.autocompleteCallback = (res) => {
        console.log(`%cCALLBACK`, "color: lightgreen;");
        componentCallback(res)
      }
    }

    return script // return script object to be removed on unmount by useEffect
  }

  const getSuggestionsForInput = () => {
    if (primaryInput === '') {   // dont look for suggestions when empty input
      return []
    }
    let suggestions = []

    // get commands
    const matchingCommand = commands.find(command => command.key.includes(primaryInput))
    if (matchingCommand) {
      const commandSuggestion = {
        content: matchingCommand.name,
        iconUrl: matchingCommand.iconUrl,
        hex: matchingCommand.hex,
        url: matchingCommand.url,
        id: `${matchingCommand.name}_${matchingCommand.url}`
      }
      suggestions = suggestions.concat(commandSuggestion)
    }

    // get default suggestions
    const matchingDefaultSuggestion = defaultSuggestions.find(suggestion => suggestion.key.includes(primaryInput))
    if (matchingDefaultSuggestion) {
      // add each suggestion name in list to suggestions
      matchingDefaultSuggestion.suggestions.map(suggestion => {
        suggestions = suggestions.concat({
          content: suggestion.name,
          url: suggestion.url,
          id: `${suggestion.name}_${suggestion.url}`
        });
        return suggestions;
      })
    }
    return suggestions
  }

  /*
  * Get autocomplete suggestions
  */
  const getAutocompleteSuggestionsForInput = (res, prevSuggestions) => {
    console.log('suggestionsToShow before appending async suggestions: ', prevSuggestions);
    return [  // Set calculated suggestions
      ...prevSuggestions,
      ...buildAutocompleteSuggestions(res[1], prevSuggestions)
    ]
  }

  /*
  * Update autocomplete suggestions each time primary input changes
  */
  useEffect(() => {
    // set non-async suggestions
    setSuggestionsToShow(prevState => getSuggestionsForInput(primaryInput))

    // set async suggestions to show
    let autocompleteScript = null
    let active = true

    if (primaryInput.length > 1) {
      autocompleteScript = callAutocompleteScript((scriptResponse) => {
        if (active) {
          console.log(`useEffect for %c'${primaryInput}' %cisActive?: %c${active}`, "color: DeepPink;", "", "color: Gold;");
          setSuggestionsToShow(prevState => getAutocompleteSuggestionsForInput(scriptResponse, prevState))
        }
      })
    }
    return () => {
      active = false
      if (autocompleteScript)
        document.head.removeChild(autocompleteScript)
    }
  }, [primaryInput])

  useEffect(() => {
    // reset highlightIndex
    setHighlightIndex(0)

    // reset suggestionCounter

    // if a matchingCommand exists, set primary input text to its hex color
    const matchingCommand = commands.find(command => command.key.includes(primaryInput))
    matchingCommand
      ? setPrimaryTextColor(matchingCommand.hex.primary)
      : setPrimaryTextColor('white')
  }, [primaryInput])

  // Perform keydown action on each keypress
  useEffect(() => {
    const actionOnKeydown = suggestionsKeyEventHandler(keydownEvent, highlightIndex, setHighlightIndex, suggestionsToShow, setSuggestionsToShow)
    if (actionOnKeydown) {
      actionOnKeydown()
    }
  }, [keydownEvent])

  if (suggestionsToShow.length === 0) return null
  return (
    <div className={className}>
      {suggestionsToShow.slice(0,7).map(suggestion => (
        <StyledSuggestion
          key={suggestion.id}
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