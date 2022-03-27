import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'

import CONFIG from '../config'

import commands from '../commands'
import defaultSuggestions from '../suggestionDefaults'
import useKeydownCatcher from '../hooks/useKeydownCatcher'
import suggestionsKeyEventHandler from '../utils/suggestionsKeyEventHandler'
import buildAutocompleteSuggestions from '../utils/buildAutocompleteSuggestions'
import StyledSuggestion from './Suggestion'

const suggestionVariants = {
  hidden: {
    opacity: 0,
    y: '-10',
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.08,
      duration: 0.1,
      ease: 'easeOut',
    }
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: {
      delay: 0.1,
      duration: 0.1,
      ease: 'easeOut',
    }
  }
}

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
        id: `${matchingCommand.name}_${primaryInput}`
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
          id: `${suggestion.name}_${primaryInput}`
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
      ...buildAutocompleteSuggestions(res[1], prevSuggestions, primaryInput)
    ]
  }

  /*
  * Update autocomplete suggestions each time primary input changes
  */
  useEffect(() => {
    // set non-async suggestions
    setSuggestionsToShow(getSuggestionsForInput(primaryInput))

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

    // reset highlightIndex
    setHighlightIndex(0)

    // if a matchingCommand exists, set primary input text to its hex color
    const matchingCommand = commands.find(command => command.key.includes(primaryInput))
    matchingCommand
      ? setPrimaryTextColor(matchingCommand.hex.primary)
      : setPrimaryTextColor('white')

    return () => {
      active = false
      if (autocompleteScript)
        document.head.removeChild(autocompleteScript)
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
      <motion.div className={className} key={primaryInput}
        exit={{
          y: '-8',
          opacity: 0,
          transition: {
            duration: 0.8
          }
        }}
      >
        {suggestionsToShow.slice(0, CONFIG.suggestionLimit).map(suggestion => (
          <StyledSuggestion
            key={suggestion.id}
            suggestion={suggestion}
          />
        ))}
      </motion.div>
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