import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';

const GlobalContext = createContext();

const SET_DATA = 'SET_DATA';
const SET_LOADING = 'SET_LOADING';

function globalReducer(state, action) {
    switch (action.type) {
      case SET_DATA:
        return { ...state, data: action.payload };
      case SET_LOADING:
        return { ...state, loading: action.payload };
      default:
        return state;
    }
  };

  const initialState = {
    data: [],
    loading: true
  };

export function GlobalContextProvider ({children}) {
    const [state, dispatch] = useReducer(globalReducer, initialState);

    useEffect(() => {
        async function fetchData() {
          try {
            const response = await fetch('/mockJsonPelis.json');
            const jsonData = await response.json();
            dispatch({ type: SET_DATA, payload: jsonData });
            dispatch({ type: SET_LOADING, payload: false });
          } catch (error) {
            console.error('Error al cargar datos desde la API:', error);
            dispatch({ type: SET_LOADING, payload: false });
          }
        }
    
        fetchData();
      }, []);
    

    return (
        <GlobalContext.Provider value= {{...state}}>
            {children}
        </GlobalContext.Provider>
    )

}

export function useGlobalContext() {
    return useContext(GlobalContext)
}