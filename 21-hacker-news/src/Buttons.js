import React from 'react'
import { useGlobalContext } from './context'

const Buttons = () => {
  const {isLoading, page, nbPages, handlePage} = useGlobalContext()

  return <div className='btn-container'>
    {/* Para evitar que a pessoa fique clicando no botão freneticamente a ponto de crashar a api, usamos disabled. No caso o butão ficará disabled enquanto isLoading for true, ou seja, só poderar solicitar a api, quando ela carregar a página nova. Lá no css para o button disabled está definido que o cursor: not-allowed */}
    <button disabled={isLoading} onClick={()=>handlePage('dec')}>prev</button>
    <p>{page +1} of {nbPages}</p>
    <button disabled={isLoading} onClick={()=>handlePage('inc')}>next</button>
  </div>
}

export default Buttons
