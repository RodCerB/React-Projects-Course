import React, { useState, useEffect } from 'react'
import data from './data'
import Article from './Article'

// Quando att a página, ele retorna para o tema claro pois é o setState dele. Para gravar qual tema está atualmente, nós podemos usar o local storage:
const getStorageTheme = () => {
  let theme = 'light-theme'
  // Nada mais do que vai ver se tem o theme gravado no localStorage
  if(localStorage.getItem('theme')){
    theme = localStorage.getItem('theme')
  }
  // Não tendo nada gravado no localStorage, ele vai retornar theme que por base ja definimos como light-theme
  return theme
}

function App() {
  // const [theme, setTheme] = useState('light-theme')
  // precisamosa gora mudar para invocar o getStorage
  const [theme, setTheme] = useState(getStorageTheme())

  useEffect(()=>{
    // definindo o css do documento
    document.documentElement.className = theme
    // além de definir o css, iremos colocar no localStorage o theme mudado
    localStorage.setItem('theme', theme)
  },[theme])

  const toggleTheme = () => {
    if(theme === 'light-theme'){
      setTheme('dark-theme')
    }else {
      setTheme('light-theme')
    }
  }
  return <main>
    <nav>
      <div className="nav-center">
        <h1>overreacted</h1>
        <button className='btn' onClick={toggleTheme}>toggle</button>
      </div>
    </nav>
    <section className="articles">
      {data.map((item)=>{
        return <Article key={item.id} {...item}/>
      })}
    </section>
  </main>
}

export default App
