import { useEffect, useState } from 'react'
import styled from 'styled-components'

import CONFIG from '../config'

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
    const script = document.createElement('script')
    const url = process.env.DDG_AUTOCOMPLETE_URL + primaryInput
    script.src = url
    script.defer = true
    document.head.appendChild(script)

    if (componentCallback && typeof window !== 'undefined') {   // in case SSR server side rendering
      window.autocompleteCallback = (res) => {
        console.log('%cCALLBACK', 'color: lightgreen;')
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
        id: `${matchingCommand.name}_${primaryInput}_${new Date().toISOString()}`
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
          id: `${suggestion.name}_${primaryInput}_${new Date().toISOString()}`
        })
        return suggestions
      })
    }
    return suggestions
  }

  /*
  * Get autocomplete suggestions
  */
  const getAutocompleteSuggestionsForInput = (res, prevSuggestions) => {
    console.log('suggestionsToShow before appending async suggestions: ', prevSuggestions)
    return [  // Set calculated suggestions
      ...buildAutocompleteSuggestions(res[1], prevSuggestions, primaryInput)
    ]
  }

  /*
  * Update autocomplete suggestions each time primary input changes
  */
  useEffect(() => {

    // set protectors from race condition on async calls
    let autocompleteScript = null
    let active = true

    // set both nonAsync and async suggestions
    if (primaryInput.length > 1) {
      autocompleteScript = callAutocompleteScript((scriptResponse) => {
        if (active) {
          // console.log(`useEffect for %c'${primaryInput}' %cisActive?: %c${active}`, "color: DeepPink;", "", "color: Gold;");
          const nonAsyncSuggestions = getSuggestionsForInput(primaryInput)
          let suggestionsToSet = [
            ...nonAsyncSuggestions,  // non-async suggestions
            ...getAutocompleteSuggestionsForInput(scriptResponse, nonAsyncSuggestions) // async suggestions
          ]
          console.log(`%cSuggestions to set: %c${JSON.stringify(suggestionsToSet.map(s => s.content))}`, 'color: hotpink;')
          setSuggestionsToShow(suggestionsToSet)
        }
      })
    } else {
      setSuggestionsToShow(getSuggestionsForInput(primaryInput))
    }

    // reset highlightIndex
    setHighlightIndex(0)

    // if a matchingCommand exists, set primary input text to its hex color
    const matchingCommand = commands.find(command => command.key.includes(primaryInput))
    matchingCommand
      ? setPrimaryTextColor(matchingCommand.hex.primary)
      : setPrimaryTextColor('white')


    return () => {
      active = false    // avoid async race condition on setSuggestionsToShow
      if (autocompleteScript)
        document.head.removeChild(autocompleteScript)
      setSuggestionsToShow([])
    }
  }, [primaryInput])

  // Perform keydown action on each keypress
  useEffect(() => {
    const actionOnKeydown = suggestionsKeyEventHandler(keydownEvent, primaryInput, highlightIndex, setHighlightIndex, suggestionsToShow, setSuggestionsToShow)
    if (actionOnKeydown) {
      actionOnKeydown()
    }
  }, [keydownEvent])


  return (
    <div className={className} key={primaryInput}>
      {suggestionsToShow.slice(0, CONFIG.suggestionLimit).map(suggestion => (
        <StyledSuggestion
          key={suggestion.id}
          suggestion={suggestion}
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
  margin: auto;

  z-index: 10;

  // grid item
  grid-row: 2;
`

export default StyledSuggestionContainer