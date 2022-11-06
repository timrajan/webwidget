import React, { useState, useEffect } from 'react'
import { API_URL } from '../../constant'
import { useUserContext } from '../../context/userContext'
import { useUserStatusContext } from '../../context/userStatusContext'
import NonPremiumStatus from './NonPremiumStatus'
import PremiumStatus from './PremiumStatus'

const UserStatus = ({ id }) => {
  const { is_premium } = useUserContext()
  const { isUserActive } = useUserStatusContext()

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
