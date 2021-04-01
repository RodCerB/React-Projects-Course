import React, { useEffect } from 'react'

const Alert = ({type, msg, removeAlert, list}) => {
  useEffect(()=> {
    const timeout = setTimeout(()=> {
      // ele precisa apenas chamar o removeAlert que é = showAlert, já que de base ele já trás as propriedades false, e strings vazias
      removeAlert()
    },2000)
    return () => clearTimeout(timeout)
  },[list])
  
  return <p className={`alert alert-${type}`}>{msg}</p>
}

export default Alert
