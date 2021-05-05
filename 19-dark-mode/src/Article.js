import React from 'react'
import moment from 'moment'
//moment js é uma das bibliotecas mais usadas para trabalhar  com data. Ela facilita não precisar fazer várias linhas de código com javascript vanila, é o que usamos nesse projeto

const Article = ({title, snippet, date, length}) => {

  return <article className='post'>
    <h2>{title}</h2>
    <div className='post-info'>
      {/* usando o moment, o format é predefinido pela documentação, só olhar lá como quer deixar */}
      <span>{moment(date).format('dddd Do, YYYY')}</span>
      <span>{length} min read</span>
    </div>
    <p>{snippet}</p>
  </article>
}

export default Article
