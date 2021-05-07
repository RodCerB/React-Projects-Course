import React, { useContext, useEffect, useReducer } from 'react'

import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from './actions'
import reducer from './reducer'

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?'

const initialState = {
  isLoading: true,
  hits: [],
  query: 'react',
  page: 0,
  nbPages: 0
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  // começamos preparando o useReducer:
  const [state, dispatch] = useReducer(reducer, initialState)

  const fetchStories = async (url) => {
    // lembrando que no useReducer para modificarmos o state, utilizamos o dispatch seguido do tipo de modificação
    // Um erro comum é ao escrever o type, você colocar uma letra errada etc(exp: SET_LOADINGS) o que geraria o erro pelo default lá no reducer. Uma solução para isso é criar os actions como variáveis e importar eles, dessa forma não tem como você errar:
    // dispatch({type:'SET_LOADING'})
    dispatch({type: SET_LOADING})
    try {
      const response = await fetch(url)
      const data = await response.json()
      dispatch({type: SET_STORIES, 
        payload:{hits: data.hits, nbPages: data.nbPages}})
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(()=>{
    fetchStories(`${API_ENDPOINT}query=${state.query}&page=${state.page}`)
  },[state.query, state.page])

  const removeStory = (id) => {
    dispatch({type:REMOVE_STORY, payload:id})
  }

  const handleSearch = (query) => {
    dispatch({type:HANDLE_SEARCH, payload: query})
  }

  const handlePage = (value) => {
    dispatch({type:HANDLE_PAGE, payload: value})
  }
  // Estamos passando todas as propriedades que temos salvas no useReducer pelo {...state}
  return <AppContext.Provider value={{...state, removeStory, handleSearch, handlePage}}>{children}</AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
