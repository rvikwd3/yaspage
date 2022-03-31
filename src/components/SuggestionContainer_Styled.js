import { useEffect, useState } from 'react'
import styled from 'styled-components'

import CONFIG from '../config'
import commands from '../commands'
import defaultSuggestions from '../suggestionDefaults'
import suggestionsKeyEventHandler from '../utils/suggestionsKeyEventHandler'
import buildAutocompleteSuggestions from '../utils/buildAutocompleteSuggestions'
import Suggestion_Styled from './Suggestion'

// get interface input text
// show suggestions
//    suggestion order:
//      1. commands
//      2. default command suggestions
//      2. duckduckgo search autocomplete suggestions
const SuggestionContainer = ({ className, interfaceInput, keydownEvent }) => {

  const [suggestionsToShow, setSuggestionsToShow] = useState([])
  const [highlightIndex, setHighlightIndex] = useState(0)

  const callAutocompleteScript = (componentCallback) => {
    const script = document.createElement('script')
    const url = process.env.DDG_AUTOCOMPLETE_URL + interfaceInput
    script.src = url
    script.defer = true
    document.head.appendChild(script)

    if (componentCallback && typeof window !== 'undefined') {   // in case SSR server side rendering
      window.autocompleteCallback = (res) => {
        componentCallback(res)
      }
    }

    return script // return script object to be removed on unmount by useEffect
  }

  const getSynchronousSuggestionsForInput = () => {
    if (interfaceInput === '') {   // dont look for suggestions when empty input
      return []
    }
    let suggestions = []

    // get commands
    const matchingCommand = commands.find(command => command.key.includes(interfaceInput))
    if (matchingCommand) {
      const commandSuggestion = {
        content: matchingCommand.name,
        iconUrl: matchingCommand.iconUrl,
        hex: matchingCommand.hex,
        url: matchingCommand.url,
        id: `${matchingCommand.name}_${interfaceInput}`
      }
      suggestions = suggestions.concat(commandSuggestion) // add commands to suggestionList
    }

    // get default suggestions
    const matchingDefaultSuggestion = defaultSuggestions.find(suggestion => suggestion.key.includes(interfaceInput))
    if (matchingDefaultSuggestion) {
      matchingDefaultSuggestion.suggestions.map(suggestion => {  // add each command default suggestion to suggestions
        suggestions = suggestions.concat({
          content: suggestion.name,
          url: suggestion.url,
          id: `${suggestion.name}_${interfaceInput}`
        })
        return suggestions
      })
    }
    return suggestions
  }

  /*
  * Update autocomplete suggestions each time primary input changes
  * Reset highlight position on primary input change
  */
  useEffect(() => {
    let autocompleteScript = null // <script> tag in <head> for ddg autocomplete to remove
    let active = true // set protectors from race condition on async calls

    // set both nonAsync and async suggestions
    if (interfaceInput.length > 1) {
      autocompleteScript = callAutocompleteScript((scriptResponse) => {
        if (active) {
          const nonAsyncSuggestions = getSynchronousSuggestionsForInput(interfaceInput)
          let suggestionsToSet = [
            ...nonAsyncSuggestions,  // non-async suggestions
            ...buildAutocompleteSuggestions(scriptResponse[1], nonAsyncSuggestions, interfaceInput) // async suggestions
          ]
          setSuggestionsToShow(suggestionsToSet)
        }
      })
    } else {
      setSuggestionsToShow(getSynchronousSuggestionsForInput(interfaceInput))
    }

    return () => {
      active = false    // avoid async race condition on setSuggestionsToShow
      if (autocompleteScript)
        document.head.removeChild(autocompleteScript)
      setHighlightIndex(0) // reset highlightIndex on rerender
    }
  }, [interfaceInput])

  // Perform keydown action on each keypress
  useEffect(() => {
    const actionOnKeydown = suggestionsKeyEventHandler(
      keydownEvent,
      interfaceInput,
      highlightIndex,
      setHighlightIndex,
      suggestionsToShow,
      setSuggestionsToShow
    )
    if (actionOnKeydown) {
      actionOnKeydown()
    }
  }, [keydownEvent])  // adding suggestionsToShow or highlightIndex as dependencies causes infinite scroll of highlight through suggestions
  // Don't want to add interfaceInput as dependency either, because I don't want to run the last key event on interfaceInput change (duplicated key event)

  return (
    <div className={className}>
      {suggestionsToShow.slice(0, CONFIG.suggestionLimit).map(suggestion => (
        <Suggestion_Styled
          key={suggestion.id}
          suggestion={suggestion}
        />
      ))}
    </div>
  )
}

const SuggestionContainer_Styled = styled(SuggestionContainer)`
  display: flex;  // suggestion list flex container
  flex-direction: column;
  align-items: center;
  gap: 10px;

  width: 33%;
  padding: 15px;
  margin: auto;

  z-index: 10;

  // grid item
  grid-row: 2;

  &.fade-appear,
  &.fade-enter {
    opacity: 0;
    transform: translateY(-10px);
  }

  &.fade-appear-active,
  &.fade-enter-active {
    opacity: 1;
    transform: translateY(0px);
  }

  &.fade-exit {
    opacity: 1;
    transform: translateY(0px);
  }

  &.fade-exit-active {
    opacity: 0;
    transform: translateY(10px);
  }

  &.fade-appear-active,
  &.fade-enter-active,
  &.fade-exit-active {
    transition: opacity 300ms, transform 300ms cubic-bezier(0.25, 1, 0.5, 1);
    transition-delay: 200ms;
  }

`

export default SuggestionContainer_Styled