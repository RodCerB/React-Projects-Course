import React, { useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import Photo from './Photo'


const mainUrl = `https://api.unsplash.com/photos/`
const searchUrl = `https://api.unsplash.com/search/photos/`
// Para não deixarmos nossas chaves expostas, um método possivel é usar arquivos env, lá precisamos começar chamando sempre com REACT_APP_, o que vem depois é so o nome. E para chamar ele aqui, fazemos: process.env.(o nome).
// OBS: Sempre que define o env, precisa reiniciar o localhost
const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`

function App() {
  
  const [loading, setLoading] = useState(false)
  const [photos, setPhotos] = useState([])
  const [page, setPage] = useState(0)
  //pesquisa:
  const [query, setQuery] = useState('')

  const fetchImages = async () => {
    setLoading(true)
    // o pq de usarmos let para o url é que ele mudará dependendo se estaremos pesquisando ou pegando as imagens default(as que aparecem em tela)
    let url;
    const urlPage = `&page=${page}`
    const urlQuery = `&query=${query}`

    // Nós temos duas urls para usar, a básica e a de pesquisa. Para isso criamos essa condicional onde, se query for uma string vazia ela será considerada false
    if(query){
      url = `${searchUrl}${clientID}${urlPage}${urlQuery}`
    }else{
      url = `${mainUrl}${clientID}${urlPage}`
    }

    try {
      const response = await fetch(url)
      const data = await response.json()
      // setPhotos(data)
      // Precisamos mudar o setPhotos pq, ao chegarmos no fim da página ele irá bugar, pois já tinhamos as fotos e estamos mudando a page, quebrnado assim a visualização. Para resolver isso vamos fazer:
      
      // setPhotos((oldPhotos)=>{return [...oldPhotos, ...data]})
      // Novamente vamos precisar mudar por causa da pesquisa. A pesquisa ela nos traz um array diferente(traz dentro de results), por isso vamos ter que fazer da seguinte forma:
      setPhotos((oldPhotos)=> {
        // Tudo setado, nós ainda precisamos fazer algo para limpar as imagens default que estão aparecendo, pois quando pesquisamos não sobrepõe elas, para isso fazemos outra condicional:
        if(query && page === 1){
          return data.results
        }
        // if(query){ precisamos trocar o if para else if já que add a condicional anterior
        else if(query){
          return [...oldPhotos, ...data.results]
        }else{
          return [...oldPhotos, ...data]
        }
      })
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }
  useEffect(()=>{
    fetchImages()
    //o comentário abaixo serve para tirar o aviso de erro de estar faltando uma dependência, no caso o loading.
    // eslint-disable-next-line
  },[page])
  // Vamos criar outro useEffect para chamar a api novamente ao chegarmos no fim do scroll. Isso poderia ser feito com alguma biblioteca do react, mas aqui vamos fazer manualmente. Para isso é preciso usar o eventListener do js escutando o scroll e tendo um call back function
  useEffect(()=>{
    const event = window.addEventListener('scroll', ()=>{
      // Para fazermos essa função, nós precisamos de 3 medidas, innerHeight, scrollY e scrollHeight, sendo que, iremos somar innerHeight com scrollY(é o quanto a gente 'scrollou') para compararmos com scrollHeight, no caso, quando elas forem maior, aí acionaremos um novo pedido de imagens
      // console.log(`innerHeight ${window.innerHeight}`)
      // console.log(`scrollY ${window.scrollY}`)
      // console.log(`body height ${document.body.scrollHeight}`)
      // A gente coloca o -2(pixels) apenas para fazer ele carregar antes que a gente chegue de fato no fim da página, se quisesse poderia colocar outros valores ou nenhum e só carregar no final mesmo
      // A gente coloca a condicional de loading ser false pois não queremos que ele faça solicitação ao mesmo tempo que a primeira, quando não temos nada carregado e está apenas carregando
      if((
        !loading &&
        window.innerHeight + window.scrollY )>= document.body.scrollHeight - 2){
        setPage((oldPage)=>{return oldPage+1})
      } 
    })
    // Lembrando que precisamos tirar os event listener para nao ficar um loop infinito, para isso retornamos o seguinte:
    return () => window.removeEventListener('scroll', event)
    // eslint-disable-next-line
  },[])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Nós modificamos o setPage inicial para 0 e colocamos aqui o setPage(1) pois isso irá fazer ele limpar os valores antigos, e quando fizermos o scroll para surgir mais páginas, ele responderá corretamente com o tema da pesquisa
    setPage(1)
  }

  return <main>
    <section className='search'>
      <form className='search-form'>
        <input type='text' placeholder='search' className='form-input' value={query} onChangue={(e)=>setQuery(e.target.value)} />
        <button type='submit' className='submit-btn' onClick={handleSubmit}>
        <FaSearch />    
        </button>  
      </form>  
    </section>
    <section className="photos">
      <div className="photos-center">
        {photos.map((photo)=>{
          return <Photo key={photo.id} {...photo}/>
        })}
      </div>
      {/* nesse nosso projeto o loading é um pouco diferente. Ele não fica aparecendo antes do primeiro carregamento do api(por isso até fica stateado como falso), ele aparece no final, antes de ocorrer um novo carregamento de imagens através do scroll */}
      {loading && <h2 className='loading'>Loading...</h2>}
    </section>
  </main>
}

export default App
