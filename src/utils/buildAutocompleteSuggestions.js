import { googleSearchBuildQuery } from './googleSearchBuildQuery'

const limitContentLength = (content) => {
  return content.length > 30 ? content.slice(0, 30) + '...' : content
}

const buildAutocompleteSuggestions = (autocompleteSuggestions, commandSuggestions, interfaceInput) => {
  // filter matching autocompletes that match commands
  if (commandSuggestions.length !== 0)
    autocompleteSuggestions = autocompleteSuggestions.filter(ac => !(commandSuggestions.map(s => s.content).includes(ac)))

  // build autocomplete suggestion list
  const acSuggestionList = autocompleteSuggestions.map(sugg => ({
    content: limitContentLength(sugg),
    url: googleSearchBuildQuery(sugg),
    id: `${sugg}_${interfaceInput}`
  }))

  return acSuggestionList
}

export default buildAutocompleteSuggestions