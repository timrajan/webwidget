import React, { useContext, useEffect } from 'react'
import { useGlobalContext } from './globalContext'
import useFetch from '../hooks/useFetch'
import { API_URL } from '../constant'

const initialState = {
  avatar: '',
  first_name: '',
  email: '',
  is_premium: false,
}

const UserContext = React.createContext(initialState)

const useUserContext = () => useContext(UserContext)

const UserProvider = ({ children }) => {
  const { id } = useGlobalContext()
  const { myFetch, data } = useFetch(
    `${API_URL}/getdocownerinfo/${btoa(id)}/`,
    false,
    false
  )

  useEffect(() => {
    if (id) {
      myFetch()
    }
  }, [id])

  return (
    <UserContext.Provider
      value={{
        avatar: data?.avatar,
        first_name: data?.first_name,
        email: data?.email,
        is_premium: data?.is_premium,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export { UserProvider, useUserContext, UserContext }
