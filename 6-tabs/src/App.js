import React, { useState, useEffect } from 'react'
import { FaAngleDoubleRight } from 'react-icons/fa'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tabs-project'

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [value, setValue] = useState(0);

  const fetchJobs = async() => {
    try {
      const resp = await fetch(url);
      const newJobs = await resp.json();
      setJobs(newJobs);
      setIsLoading(false);
    }
    catch(error){
      setIsLoading(false);
      console.log(error)
    }
  };
  useEffect(()=> {
    fetchJobs();
  }, []);

  if(isLoading) {
    return (<section className='section loading'>
      <h1>Loading...</h1>
    </section>)
  }

  const {company,dates,duties,title} = jobs[value]

  return (<section className='section'>
    <div className="title">
      <h2>experience</h2>
      <div className="underline"></div>
    </div>
    <div className="jobs-center">
      <div className="btn-container">
        {jobs.map((item,index)=>{
          return <button key={item.id} onClick={()=> setValue(index)} className={`job-btn ${index === value && 'active-btn'}`}>{item.company}</button>
        })}
      </div>
      <article className='job-info'>
        <h3>{title}</h3>
        <h4>{company}</h4>
        <p className="job-date">{dates}</p>
        {duties.map((duty, index)=>{
          return <div key={index} className='job-desc'>
            <FaAngleDoubleRight className='job-icon' />
            <p>{duty}</p>
          </div>
        })}
      </article>
    </div>
  </section>)
}

export default App
