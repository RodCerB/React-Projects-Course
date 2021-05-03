import React, { useState, useEffect } from 'react'
import { useFetch } from './useFetch'
import Follower from './Follower'

function App() {
  const {loading, data} = useFetch()
  // Antes que estava usando os dados direto vindo da api eu podia trazer data direto, só que agora data está dividido em outros array(numeros de páginas), então vou ter que fazer algumas modificações:
  const [page, setPage] = useState(0)
  const [followers, setFollowers] = useState([])

  useEffect(()=>{
    // se deixarmos o useEffect direto com setFollowers, vai dar erro pq inicialmente o followers é um array vazio, então ele vai crashar ao tentar fazer o .map. Para isso precisamos primeiro colocar o if(loadign) que ira retornar nada, e só quando fizermos a requisição da api e retornar loading como false, ai sím teremos o setFolowers e o map rodará
    if(loading){return}
    setFollowers(data[page])
    // precisei add page no motivador do useEffect para ele poder att quando usar o handlePage 
  },[loading, page])

  const handlePage = (index) => {
    setPage(index)
  }
  const nextPage = () => {
    setPage((oldPage)=>{
      let nextPage = oldPage + 1
      if(nextPage > data.length -1){
        nextPage = 0
      }
      return nextPage
    })
  }
  const prevPage = () => {
    setPage((oldPage)=>{
      let prevPage = oldPage - 1
      if(prevPage < 0){
       prevPage = data.length-1
      }
      return prevPage
    })
  }

  return <main>
    <div className="section-title">
      <h1>{loading ? 'loading...' : "pagination"}</h1>
      <div className="underline"></div>
    </div>
    <section className="followers">
      <div className='container'>
        {followers.map((follower)=>{
          return <Follower key={follower.id} {...follower}/>
        })}
      </div>
      {/* Para os botões não ficarem aparecendo durante o loading, fazemos essa condicional de só aparecer quando loading é false */}
      {!loading &&       
      <div className="btn-container">
        <button className='prev-btn' onClick={prevPage}>
          prev
        </button>
        {data.map((item, index)=>{
          // Nesse map não importa para a gente as informações que estão no data, nao importamos para o array dos array etc, so queremos saber o tamanho dele que é exatamente a nossa quantidade de páginas, por isso chamamos ele aqui e o que interessa para nós é o {index}
          return <button key={index} className={`page-btn ${index===page ? 'active-btn' : null}`} onClick={()=> handlePage(index)}>
            {index + 1}
          </button>
        })}
        <button className='next-btn' onClick={nextPage}>
          next
        </button>
      </div>}

    </section>
  </main>
}

export default App
