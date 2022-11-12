import React, { useContext, useEffect } from 'react'
import { useGlobalContext } from './globalContext'
import useFetch from '../hooks/useFetch'
import { API_URL } from '../constant'

const initialState = {
  faqs: [],
}

const FaqContext = React.createContext(initialState)

const useFaqContext = () => useContext(FaqContext)

const FaqProvider = ({ children }) => {
  const { id } = useGlobalContext()
  const { myFetch, data } = useFetch(
    `${API_URL}/gettopnquestions/${btoa(id)}/15/`
  )

  useEffect(() => {
    if (!id) return
    myFetch()
  }, [id])

  return (
    <FaqContext.Provider
      value={{
        faqs: data,
      }}
    >
      {children}
    </FaqContext.Provider>
  )
}

export { FaqProvider, useFaqContext, FaqContext }
