import React, { useState } from 'react'
import Modal from './Modal'
import Sidebar from './Sidebar'
import Home from './Home'

function App() {
  const [isModal, setIsModal] = useState(false)
  const [isSidebar, setIsSidebar] = useState(false)

  const changeModal = () => {
    setIsModal(!isModal)
  }
  const changeSidebar = () => {
    setIsSidebar(!isSidebar)
  }

  return (
    <>      
      <Home changeModal={changeModal} changeSidebar={changeSidebar}/>
      <Modal isModal={isModal} changeModal={changeModal}/>
      <Sidebar isSidebar={isSidebar} changeSidebar={changeSidebar}/>
    </>
  )
}

export default App
