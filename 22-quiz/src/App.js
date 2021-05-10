import React from 'react'
import { useGlobalContext } from './context'

import SetupForm from './SetupForm'
import Loading from './Loading'
import Modal from './Modal'

function App() {
  const {waiting, loading, questions, index, correct, nextQuestion, checkAnswer} = useGlobalContext()

  if(waiting){
    return <SetupForm />
  }
  if(loading){
    return <Loading />
  }

  const {question, incorrect_answers, correct_answer} = questions[index]
  // Da seguinte forma como estávamos fazendo, as respostas certas sempre eram a ultima a ser listada, para embaralhar elas vamos fazer de forma diferente
  // const answers = [...incorrect_answers, correct_answer]
  let answers = [...incorrect_answers]
  const tempIndex = Math.floor(Math.random()*4)
  if(tempIndex === 3){
    answers.push(correct_answer)
  }else{
    answers.push(answers[tempIndex])
    answers[tempIndex] = correct_answer
  }
  return (
    <main>
      <Modal />
      <section className='quiz'>
        <p className='correct-answers'>
          correct answers : {correct}/{index}
        </p>
        <article className='container'>
          {/* Normalmente faríamos da seguinte forma, contudo, essa api ela não traz as perguntas como strings, mas como html.  */}
          {/* <h2>{question}</h2> */}
          {/* E porquê é tão 'assustador' esse método que estamos passando? Pois é perigosos vc passar html por api, codigos maliciosos podem ser passados sem você saber se não conhecer a api a fundo */}
          <h2 dangerouslySetInnerHTML={{__html: question}}/>
          <div className='btn-container'>
            {answers.map((answer, index)=>{
              // Como o onClick seguinte está funcionando. O valor que ele vai passar é true ou false. Se a resposta correta for a answer que estou cliclando, ele vai passar true
              return <button key={index} className='answer-btn' onClick={()=>{checkAnswer(correct_answer === answer)}} dangerouslySetInnerHTML={{__html: answer}}/>
            })}
          </div>
        </article>
        <button className='next-question' onClick={nextQuestion}>next question</button>
      </section>
    </main>)
}

export default App
