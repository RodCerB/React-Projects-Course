import React from 'react'
import { FaTimes } from 'react-icons/fa'

const Modal = ({isModal, changeModal}) => {
  return <div className= {`${isModal ? 'modal-overlay show-modal' : 'modal-overlay'}`}>
    <div className='modal-container'>
      <h3>modal content</h3>
      <button className='close-modal-btn' onClick={changeModal}><FaTimes /></button>
    </div>
  </div>
}

export default Modal
