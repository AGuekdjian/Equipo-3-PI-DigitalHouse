import React, { createContext, useReducer, useEffect } from "react";
import { Global } from "../helpers/Global";

export const GlobalContext = createContext();

const initialState = {
  data: [],
  loading: true,
};

export const GlobalProvider = ({ children }) => {
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await fetch(
        `${Global.endpoints.backend.backendJava}api/movies`
      );
      const jsonData = await response.json();
      dispatch({ type: Global.actionType.SET_DATA, payload: jsonData.content });
      dispatch({ type: Global.actionType.SET_LOADING, payload: false });
    } catch (error) {
      console.error("Error al cargar datos desde la API:", error);
    }
  }

  function globalReducer(state, action) {
    switch (action.type) {
      case Global.actionType.SET_DATA:
        return { ...state, data: action.payload };
      case Global.actionType.SET_LOADING:
        return { ...state, loading: action.payload };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(globalReducer, initialState);

  return (
    <GlobalContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};
