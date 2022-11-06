import React, { useContext, useState, useEffect } from 'react'
import { API_URL } from '../constant'
import { useGlobalContext } from './globalContext'

const initialState = {
  isUserActive: false,
}

const UserStatusContext = React.createContext(initialState)

const useUserStatusContext = () => useContext(UserStatusContext)

const UserStatusProvider = ({ children }) => {
  const { id } = useGlobalContext()
  const [isUserActive, setIsUserActive] = useState(false)

  useEffect(() => {
    if (!id) return

    const checkStatus = async () => {
      try {
        const res = await fetch(
          `${API_URL}/getsingledocinfo_noauth/${btoa(id)}/`
        )
        const data = await res.json()
        setIsUserActive(data.is_owner_online)
      } catch (error) {
        console.log('failed to get user status', error)
      }
    }
    checkStatus()
    const interval = setInterval(() => checkStatus(), 30000)
    return () => {
      clearInterval(interval)
    }
  }, [id])

  return (
    <UserStatusContext.Provider
      value={{
        isUserActive,
      }}
    >
      {children}
    </UserStatusContext.Provider>
  )
}

export { UserStatusProvider, useUserStatusContext, UserStatusContext }
