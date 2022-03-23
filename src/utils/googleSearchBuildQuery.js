export const googleSearchBuildQuery = (query) => {
  const uriQuery = encodeURIComponent(query).replace(/%20/g, '+')
  return `https://www.google.com/search?q=${uriQuery}`
}