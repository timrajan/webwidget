import { useEffect, useCallback, useRef, useReducer } from 'react'

const initialState = {
  loading: false,
  data: null,
  error: null,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'fetchDataStart':
      return {
        ...state,
        loading: true,
        data: null,
        error: null,
      }
    case 'fetchDataSuccess':
      return {
        ...state,
        loading: false,
        data: action.data,
        error: null,
      }
    case 'fetchDataFail':
      return {
        ...state,
        loading: false,
        data: null,
        error: action.data,
      }
    default:
      return state
  }
}

function useFetch(
  url,
  reqLoading = true,
  reqError = true,
  isFetchAfterMount = false
) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const controllerRef = useRef(null)

  const myFetch = useCallback(() => {
    const controller = new AbortController()
    controllerRef.current = controller
    if (reqLoading) {
      dispatch({ type: 'fetchDataStart' })
    }
    fetch(url, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: 'fetchDataSuccess',
          data,
        })
      })
      .catch((error) => {
        if (reqError) {
          dispatch({ type: 'fetchDataFail', data: error })
        }
      })
  }, [url])

  useEffect(() => {
    if (isFetchAfterMount) {
      myFetch()
    }
    return () => {
      if (controllerRef.current) controllerRef.current.abort()
    }
  }, [url])

  return {
    data: state.data,
    loading: state.loading,
    error: state.error,
    myFetch,
  }
}

export default useFetch
