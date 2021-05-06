import React, { useState, useContext, useEffect } from 'react'
import useFetch from './useFetch'
// *******Refatorando:
export const API_ENDPOINT = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}`

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  // Para inicar vamos criar os states values no context:
  // *******Refatorando:
  // const [isLoading, setIsLoading] = useState(true)
  // const [error, setError] = useState({show:false, msg:''})
  // const [movies, setMovies] = useState([])

  const [query, setQuery] = useState('batman')
  const {isLoading, error, data:movies} = useFetch(`&s=${query}`)
  // *******Refatorando:
  // const fetchMovies = async (url) => {
  //   // Toda vez que eu pesquisar por um filme, eu quero que mostre que está carregando a página, por isso:
  //   setIsLoading(true)
  //   try {
  //     const response = await fetch(url)
  //     const data = await response.json()
  //     if(data.Response === 'True'){
  //       setMovies(data.Search)
  //       // Enquanto estivermos escrevendo na barra de pesquisa, ele vai dar aviso de erro, mas quando carregar queremos que ele suma, por isso setamos o erro para:
  //       setError({show:false, msg:''})
  //     } else {
  //       setError({show:true, msg:data.Error})
  //     }
  //     setIsLoading(false)
  //   } catch {
  //     console.log(error)
  //   }
  // }
  // useEffect(()=>{
  //   // estamos chamando de url o link do nosso api com a parte de pesquisa
  //   fetchMovies(`${API_ENDPOINT}&s=${query}`)
  // },[query])

  // Por fim vamos para para os childrens, os values que são nossos states além do setQuery em específico:
  return <AppContext.Provider value={{isLoading, error, movies, query, setQuery}}>{children}</AppContext.Provider>
} 
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
