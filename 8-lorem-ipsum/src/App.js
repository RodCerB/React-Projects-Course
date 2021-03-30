import React, { useState } from 'react';
import data from './data';


function App() {
  const [count, setCount] = useState(0)
  const [text, setText] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    //estava retornando como string o count, por isso transformamos em number com o parseInt
    let amount = parseInt(count)
    // método slice seleciona uma quantidade certa de arrays indo de 0 até o ultimo valor, no caso o amount
    if(count <=0){
      amount = 1
    }
    if(count > 8){
      amount = 8
    }
    setText(data.slice(0,amount))
  }
  
  return (
  <section className='section-center'>
    <h3>tired of boring lorem ipsum?</h3>
    <form className='lorem-form' onSubmit={handleSubmit}>
      <label htmlFor="amount">paragraphs:</label>
      <input type="number" name='amount' id='amount' value={count} onChange={(e)=>setCount(e.target.value)}/>
      <button type='submit' className='btn'>generate</button>
    </form>
    <article className='lorem-text'>
      {text.map((item, index)=>{
        return <p key={index}>{item}</p>
      })}
    </article>
  </section>
    )
}

export default App;
