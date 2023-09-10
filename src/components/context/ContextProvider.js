import React, { createContext,useState } from 'react'

export const addData = createContext();


 const ContextProvider = ({children}) => {

    const [loginData,setLoginData] = useState("");
    
  return (
    <>
        <addData.Provider value={{loginData,setLoginData}}>
                {children}
        </addData.Provider>
    </>
  )
}

export default ContextProvider;
