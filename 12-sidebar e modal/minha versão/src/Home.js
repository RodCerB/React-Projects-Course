import React, { useContext } from 'react'
import { FaBars } from 'react-icons/fa'

const Home = ({changeModal,changeSidebar}) => {
  return <main>
    <button className='sidebar-toggle' onClick={changeSidebar}><FaBars /></button>
    <button className='btn' onClick={changeModal}>show modal</button>
  </main>
}

export default Home
