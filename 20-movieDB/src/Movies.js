import React from 'react'
import { useGlobalContext } from './context'
import { Link } from 'react-router-dom'
const url =
  'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png'

const Movies = () => {
  const {movies, isLoading} = useGlobalContext()

  if(isLoading){
    return <div className='loading'></div>
  }
  
  console.log(movies)
  return <section className='movies'>
    {movies.map((movie)=>{
      const {imdbID:id, Poster:poster, Title:title, Year:year} = movie
      return <Link to={`/movies/${id}`} key={id} className='movie'>
        <article>
          {/* Quando o filme nao tem poster ele vem como N/A, para não ficar simplesmente sem imagem, vamos usar uma imagem padrão de 'no picture available' para aparecer nesses casos */}
          <img src={poster === 'N/A' ? url : poster} alt={title}/>
          <div className="movie-info">
            <h4 className='title'>{title}</h4>
            <p>{year}</p>
          </div>
        </article>
      </Link>
    })}
  </section>
}

export default Movies
