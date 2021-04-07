import React from 'react'
import logo from './logo.svg'
import { FaTimes } from 'react-icons/fa'
import { socials, links } from './data'

const Sidebar = ({isSidebar, changeSidebar}) => {
  return <aside>
    <div className={`${isSidebar ? 'sidebar show-sidebar' : 'sidebar'}`}>
      <div className='sidebar-header'>
        <img src={logo} alt="coding addict"/>
        <button className='close-btn' onClick={changeSidebar}><FaTimes /></button>
      </div>
      {console.log(links)}
      <ul className='links'>
        {links.map((link)=>{
          const {id,url,text,icon} = link

          return <li key={id}>
            <a href={url}>{icon}{text}</a>
          </li>
        })}
      </ul>
      <ul className='social-icons'>
        {socials.map((social)=>{
          const {id,url,icon} = social
          
          return <li key={id}>
              <a href={url}>{icon}</a>
            </li>
        })}
      </ul>
    </div>
  </aside>
}

export default Sidebar
