import React, { useState, useRef, useEffect } from 'react'
import { FaBars, FaTwitter } from 'react-icons/fa'
import { links, social } from './data'
import logo from './logo.svg'

const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false)
  const linksContainerRef = useRef(null)
  const linksRef = useRef(null)

  useEffect(()=> {
    const linksHeight = linksRef.current.getBoundingClientRect().height
    if(showLinks){
      linksContainerRef.current.style.height = `${linksHeight}px`
    }
    else {
      linksContainerRef.current.style.height = '0px'
    }
  },[showLinks])

  return <nav>
    <div className="nav-center">
      <div className="nav-header">
        <img src={logo} alt="logo"/>
        <button className='nav-toggle' onClick={()=> setShowLinks(!showLinks)}>
          <FaBars />
        </button>
      </div>

      {/* ESSA É A FORMA SIMPLES DE SE FAZER O TOGGLE 
      {showLinks && (
          <div className='links-container show-container'>
          <ul className='links'>
           Essa era uma forma mais manual. Uma forma mais automática é importar dados separados
            
            <li>
              <a href="#">home</a>
            </li>
            <li>
              <a href="#">about</a>
            </li>
            <li>
              <a href="#">contact</a>
            </li>
            <li>
              <a href="#">products</a>
            </li>
            ////// A FORMA MAIS AUTOMATICA:
            {links.map((link)=> {
              const {id,url,text} = link
              return <li key={id}>
                <a href={url}>
                  {text}
                </a>
              </li>
            })}
          </ul>
        </div>
      )}
*/}
      {/* A FORMA MAIX COMPLEXA USANDO CLASSE PRO TOGGLE: 
      <div className={`${showLinks ? 'links-container show-container': 'links-container'}`} >
      */}
        <div className='links-container' ref={linksContainerRef}>
          <ul className='links' ref={linksRef}>
            {links.map((link)=> {
              const {id,url,text} = link
              return <li key={id}>
                <a href={url}>
                  {text}
                </a>
              </li>
            })}
          </ul>
        </div>

      <ul className="social-icons">
        {/* Mesma coisa do anterior
        <li>
          <a href="https://www.twitter.com">
            <FaTwitter />
          </a> 
        </li>
        <li>
          <a href="https://www.twitter.com">
            <FaTwitter />
          </a> 
        </li>
        <li>
          <a href="https://www.twitter.com">
            <FaTwitter />
          </a> 
        </li> */}
        {social.map((socialIcon)=> {
          const {id, url, icon} = socialIcon
          return <li key={id}>
            <a href={url}>{icon}</a>
          </li>
        })}
      </ul>
    </div>
  </nav>
}

export default Navbar
