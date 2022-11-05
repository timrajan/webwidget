import React, { useState, useEffect } from 'react'
import { API_URL } from '../../constant'
import { useUserContext } from '../../context/userContext'
import NonPremiumStatus from './NonPremiumStatus'
import PremiumStatus from './PremiumStatus'

const UserStatus = ({ id }) => {
  const { is_premium } = useUserContext()
  const [isUserActive, setIsUserActive] = useState(false)

  useEffect(() => {
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
    // const interval = setInterval(() => checkStatus(), 30000)
    // return () => {
    //   clearInterval(interval)
    // }
  }, [])

  return (
    <>
      <span
        className={`atalki-status-icon ${isUserActive ? 'online' : 'offline'}`}
      />
      <span className='atalki-status'>
        {is_premium ? (
          <PremiumStatus isUserActive={isUserActive} />
        ) : (
          <NonPremiumStatus isUserActive={isUserActive} id={id} />
        )}
      </span>
    </>
  )
}

export default UserStatus
