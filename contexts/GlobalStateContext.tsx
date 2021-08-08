import React, { createContext, FunctionComponent, useContext, useState } from 'react'

interface GlobalStateContextInterface {
  darkTheme: boolean
  setDarkTheme(darkTheme: boolean): void
}

const initialContextValue = {
  darkTheme: true,
  setDarkTheme: (darkTheme: boolean) => undefined,
}

const GlobalStateContext = createContext<GlobalStateContextInterface>(initialContextValue)

const useGlobalState = () => {
  const context = useContext(GlobalStateContext)

  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateContext')
  }

  return context
}

const GlobalStateProvider: FunctionComponent = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(false)

  const value: GlobalStateContextInterface = {
    darkTheme,
    setDarkTheme,
  }

  return <GlobalStateContext.Provider value={value}>{children}</GlobalStateContext.Provider>
}

export { GlobalStateProvider, useGlobalState }
