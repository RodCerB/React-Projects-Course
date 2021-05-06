import React, { useState, useEffect } from 'react'

export const API_ENDPOINT = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}`

// Vamos refatorar o projeto para se quiséssemos usar um unico useFetch
export const useFetch = (urlParams) => {
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState({show:false, msg:''})
    const [data, setData] = useState([])

    const fetchMovies = async (url) => {
        setIsLoading(true)
        try {
          const response = await fetch(url)
          const data = await response.json()
          if(data.Response === 'True'){
            // ***** Refatorando: setData(data.Search)
            setData(data.Search || data)
            setError({show:false, msg:''})
          } else {
            setError({show:true, msg:data.Error})
          }
          setIsLoading(false)
        } catch {
          console.log(error)
        }
      }
      useEffect(()=>{
        fetchMovies(`${API_ENDPOINT}${urlParams}`)
      },[urlParams])

    return {isLoading, error, data }
}

export default useFetch