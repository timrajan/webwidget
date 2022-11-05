import React, { useContext, useState } from 'react'

const initialState = {
  id: '',
  color: '',
  inFrame: false,
}

const GlobalContext = React.createContext(null)

const useGlobalContext = () => useContext(GlobalContext)

const GlobalProvider = ({ children }) => {
  const [globalConfig, setGlobalConfig] = useState(initialState)

  const updateGlobalConfig = (id, color, inFrame) => {
    setGlobalConfig({
      id,
      color,
      inFrame,
    })
  }

  return (
    <GlobalContext.Provider
      value={{
        id: globalConfig.id,
        color: globalConfig.color,
        inFrame: globalConfig.inFrame,
        updateGlobalConfig: updateGlobalConfig,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export { GlobalProvider, useGlobalContext, GlobalContext }
