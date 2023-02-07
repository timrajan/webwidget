import React, { useContext, useState, useEffect } from 'react'
import { API_URL } from '../constant'
import { useGlobalContext } from './globalContext'

const initialState = {
  isUserActive: false,
  isExpanded: false,
  defaultVideo: '',
}

const UserStatusContext = React.createContext(initialState)

const useUserStatusContext = () => useContext(UserStatusContext)

const UserStatusProvider = ({ children }) => {
  const { id } = useGlobalContext()
  const [isFirstTimeLoad, setIsFirstTimeLoad] = useState(false)
  const [isUserActive, setIsUserActive] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [defaultVideo, setDefaultVideo] = useState('')

  useEffect(() => {
    if (!id) return

    const checkStatus = async () => {
      try {
        const res = await fetch(
          `${API_URL}/getsingledocinfo_noauth/${btoa(id)}/`
        )
        const data = await res.json()
        setIsUserActive(data.is_owner_online)
        if (!isFirstTimeLoad) {
          setIsExpanded(data?.is_expanded)
          setDefaultVideo(data?.default_video || '')
          setIsFirstTimeLoad(true)
        }
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
        isExpanded,
        defaultVideo,
      }}
    >
      {children}
    </UserStatusContext.Provider>
  )
}

export { UserStatusProvider, useUserStatusContext, UserStatusContext }
