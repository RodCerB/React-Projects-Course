import axios from 'axios'
import React, { useState, useContext, useEffect } from 'react'

const table = {
  Mythology: 20,
  Sports: 21,
  History: 23,
}

const API_ENDPOINT = 'https://opentdb.com/api.php?'

const url = ''
// const tempUrl = 'https://opentdb.com/api.php?amount=10&category=20&difficulty=easy&type=multiple'

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  // esse projeto vai ter algo diferencial que é ter 'isLoading' e o 'waiting. Pq teremos um para o proprio projeto inicial, e um outro que é o esperando o form ser completado para ai sim chamar a api correspondente
  const [waiting, setWaiting] = useState(true)
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState([])
  const [index, setIndex] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [error, setError] = useState(false)
  const [quiz, setQuiz] = useState([{amount:10, category:'Mythology', difficulty:'easy'}])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const fetchQuestions = async (url) =>{
    setLoading(true)
    setWaiting(false)
    // Nesse projeto usamos o axios para mostrar como funciona, tecnicamente não precisaria, poderiamos fazer da forma tradicional, mas é uma boa oportunidade de testar novas ferramentas
    const response = await axios(url).catch(err => console.log(err))
    if(response){
      const data = response.data.results
      // Essa api quando você solicita além do que ela tem a responder, ela retorna um array vazio, por isso vamos preparar da seguinte forma uma outra condicional:
      if(data.length > 0){
        setQuestions(data)
        setLoading(false)
        setWaiting(false)
        setError(false)
      }else {
        // Não precisa setar loading para falso aqui pois, lá no APP a condicional do waiting vem primeiro. Dessa forma, só de colocar o waiting como true já faz ir para o form
        setWaiting(true)
        setError(true)
      }
    }else {
      setWaiting(true)
    }
  }

  const nextQuestion = () => {
    setIndex((oldIndex)=>{
      const index = oldIndex + 1
      if(index>questions.length - 1){
        openModal()
        return 0
      }else{
        return index
      }
    })
  }

  const checkAnswer = (value) =>{
    if(value){
      setCorrect((oldState)=> oldState + 1)
    }
    nextQuestion()
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setWaiting(true)
    setCorrect(0)
    setIsModalOpen(false)
  }

  // Para esse projeto não vamos utilizar o useEffect, pois, só vamos chamar a api depois que definirmos o formulário, pq estaremos construindo uma url personalizada
  // useEffect(()=>{
  //   fetchQuestions(tempUrl)
  // },[])

  // No lugar do useEffect vamos usar:
  const handleChange = (e) =>{
    const name = e.target.name
    const value = e.target.value
    // pq de termos colocado os name exatamente igual aos values lá no forms foi para chegarmos aqui e deixar de forma mais automática possível o setQuiz
    setQuiz({...quiz, [name]:value})
  }
  const handleSubmit = (e) =>{
    e.preventDefault()
    const {amount, category, difficulty} = quiz

    
    const url = `${API_ENDPOINT}amount=${amount}&difficulty=${difficulty}&category=${table[category]}&type=multiple`
    fetchQuestions(url)
  }
  return <AppContext.Provider 
    value={{
      waiting, 
      loading, 
      questions, 
      index, 
      correct, 
      error, 
      isModalOpen,
      nextQuestion,
      checkAnswer,
      closeModal,
      quiz,
      handleChange,
      handleSubmit}}>{children}</AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
