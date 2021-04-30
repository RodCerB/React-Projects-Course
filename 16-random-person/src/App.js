import React, { useState, useEffect } from 'react'
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from 'react-icons/fa'
const url = 'https://randomuser.me/api/'
const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg'
function App() {
  const [loading, setLoading] = useState(true)
  const [person, setPerson] = useState(null)
  const [title, setTitle] = useState('name')
  const [value, setValue] = useState('random person')

  const getPerson = async () => {
    const response = await fetch(url)
    const data = await response.json()
    // pegando as partes que interessa da api:
    const person = data.results[0]
    const {phone, email} = person
    // aqui não apenas peguei a propriedade que queria, como ainda a renomeei para ficar algo fácil de identificar(de large para image)
    const {large: image} = person.picture
    // a situação do login era parecida com a da imagem, mas aqui fizemos de uma forma diferente. no lugar de fazer person.login, destrinchmaos o login direto e selecionamos o password. 
    const {login: {password}} = person
    const {first, last} = person.name
    const {dob: {age}} = person
    const {street:{number,name}} = person.location
    // Para facilitar vou juntar essas informações em um unico lugar:
    const newPerson = {
      image,
      phone,
      email,
      password,
      age,
      // os dois seguintes eu resolvi juntar como uma unica informação
      street:`${number} ${name}`,
      name:`${first} ${last}`
    }
    setPerson(newPerson)
    setLoading(false)
    setTitle('name')
    setValue(newPerson.name)
  }

  useEffect(()=>{
    getPerson()
  },[])

  const handleValue = (e) => {
    // o método a seguir serve para conferir se o target é o botão mesmo e não o ícone svg. Lembrando que quem está com className='icon' é o botão, e nao o ícone svg
    // Fizemos isso pq o mouseOver as vezes pegava o botão e as vezes pegava o icone
    if(e.target.classList.contains('icon')){
      // para pegar o atributo data-label usa o dataset.label
      const newValue = e.target.dataset.label
      setTitle(newValue)
      setValue(person[newValue])
    }
  }
  
  return (
    <main>
      <div className='block bcg-black'></div>
      <div className='block'>
        <div className='container'>
          {/* no img abaixo ele irá ver se person é um objeto,ou seja, se recebeu dados da api. Caso contrário, ele vai continuar como null o que resulta em false, assim o src da img sera defaultImage mesmo */}
          <img src={(person && person.image) || defaultImage} alt="random user" className='user-img'/>
          <p className='user-title'>my {title} is</p>
          <p className="user-value">{value}</p>
          <div className='values-list'>
            <button className='icon' data-label='name' onMouseOver={handleValue}><FaUser /></button>
            <button className='icon' data-label='email' onMouseOver={handleValue}><FaEnvelopeOpen /></button>
            <button className='icon' data-label='age' onMouseOver={handleValue}><FaCalendarTimes /></button>
            <button className='icon' data-label='street' onMouseOver={handleValue}><FaMap /></button>
            <button className='icon' data-label='phone' onMouseOver={handleValue}><FaPhone /></button>
            <button className='icon' data-label='password' onMouseOver={handleValue}><FaLock/></button>
          </div>
          <button className='btn' type='button' onClick={getPerson}>
            {loading ? 'loading...' : 'random user'}
          </button>
        </div>
      </div>
    </main>)
}

export default App
