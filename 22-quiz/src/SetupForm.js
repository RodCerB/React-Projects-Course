import React from 'react'
import { useGlobalContext } from './context'

const SetupForm = () => {
  const {quiz, handleChange, handleSubmit, error} = useGlobalContext()

  return <main>
    <section className='quiz quiz-small'>
      <form className='setup-form'>
        <h2>Setup Quiz</h2>
        {/* amount */}
        <div className='form-control'>
          <label htmlFor='amount'>number of questions</label>
          <input type='number' name='amount' id='amount' value={quiz.amount} onChange={handleChange} className='form-input' min={1} max={20}/>
        </div>
        {/* category */}
        <div className='form-control'>
          <label htmlFor='category'>category</label>
          <select name='category' id='category' value={quiz.category} onChange={handleChange} className='form-input'>
            <option value='Mythology'>Mythology</option>
            <option value='History'>History</option>
            <option value='Sports'>Sports</option>
          </select>
        </div>
        {/* dificulty */}
        <div className='form-control'>
          <label htmlFor='difficulty'>difficulty</label>
          <select name='difficulty' id='difficulty' value={quiz.difficulty} onChange={handleChange} className='form-input'>
            <option value='easy'>easy</option>
            <option value='medium'>medium</option>
            <option value='hard'>hard</option>
          </select>
        </div>
        {error && <p className='error'>can't generate questions, please try different options</p>}
        <button type='submit' onClick={handleSubmit} className='submit-btn'>start</button>
      </form>
    </section>
  </main>
}

export default SetupForm
