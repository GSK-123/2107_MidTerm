import { useCallback } from 'react'

function useNavigation() {
  const navigate = useCallback((path, state = {}) => {
    window.history.pushState(state, '', path)
    window.dispatchEvent(new PopStateEvent('popstate', { state }))
  }, [])

  return navigate
}

export default useNavigation
