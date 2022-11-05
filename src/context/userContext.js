import React, { useContext, useState } from 'react'
import useFetch from '../hooks/useFetch'

const initialState = {
  avatar: '',
  first_name: '',
  email: '',
  is_premium: false,
}

const UserContext = React.createContext(null)

const useUserContext = () => useContext(UserContext)

const UserProvider = ({ children }) => {
  const { data, loading, error } = useFetch('', true)

  return (
    <UserContext.Provider
      value={{
        loading,
        error,
        data,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export { UserProvider, useUserContext, UserContext }
