import { googleSearchBuildQuery } from './googleSearchBuildQuery'

const limitContentLength = (content) => {
  return content.length > 30 ? content.slice(0,30) + '...' : content
}

const buildAutocompleteSuggestions = (list, suggestions, primaryInput) => {
  if (suggestions.length !== 0)
    list = list.filter( ac => !(suggestions.map(s=>s.content).includes(ac)) )
  const acSuggestionList = list.map(sugg => ({
      content: limitContentLength(sugg),
      url: googleSearchBuildQuery(sugg),
      id: `${sugg}_${primaryInput}`
  }))

  return acSuggestionList
}

export default buildAutocompleteSuggestions