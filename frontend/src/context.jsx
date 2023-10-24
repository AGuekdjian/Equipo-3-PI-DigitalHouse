import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';

const GlobalContext = createContext();

export function GlobalContextProvider ({children}) {

    

    return (
        <GlobalContext.Provider value= {{}}>
            {children}
        </GlobalContext.Provider>
    )

}

export function useGlobalContext() {
    return useContext(GlobalContext)
}