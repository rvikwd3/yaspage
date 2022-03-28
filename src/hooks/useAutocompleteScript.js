import { useEffect } from 'react'

const useAutocompleteScript = ({ primaryInput, componentCallback }) => {
  let url = ''
  if (primaryInput !== '')
    url = process.env.DDG_AUTOCOMPLETE_URL + primaryInput

  useEffect(() => {
    const script = document.createElement('script')
    script.src = url
    script.defer = true

    document.head.appendChild(script)

    if (componentCallback && typeof window !== 'undefined') {   // in case SSR server side rendering
      window.autocompleteCallback = (res) => {
        componentCallback(res)
      }
    }

    return () => {
      document.head.removeChild(script)
    }
  }, [primaryInput])
}

export default useAutocompleteScript