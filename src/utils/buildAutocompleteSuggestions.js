import { googleSearchBuildQuery } from './googleSearchBuildQuery'

const limitContentLength = (content) => {
  return content.length > 30 ? content.slice(0,30) + '...' : content
}

const buildAutocompleteSuggestions = (list, suggestions) => {
  if (suggestions.length !== 0)
    list = list.filter( ac => !(suggestions.map(s=>s.content).includes(ac)) )
  const acSuggestionList = list.map(el => ({
      content: limitContentLength(el),
      url: googleSearchBuildQuery(el),
      id: `${el}_${googleSearchBuildQuery(el)}`
  }))

  return acSuggestionList
}

export default buildAutocompleteSuggestions