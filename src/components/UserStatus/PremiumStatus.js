import React from 'react'

const PremiumStatus = ({ isUserActive }) => {
  return isUserActive ? 'Online' : 'Offline'
}

export default PremiumStatus
