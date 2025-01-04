import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { Context } from './Context'

const PrivateStudentLogin = () => {
    const {stateStudent}=useContext(Context);

  return (

    <div>
      {!stateStudent?<Outlet/>:<Navigate to="/"/>}
    </div>
  )
}

export default PrivateStudentLogin
