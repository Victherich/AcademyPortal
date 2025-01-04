import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { Context } from './Context'

const PrivateTeacherLogin = () => {
    const {stateTeacher}=useContext(Context);

  return (

    <div>
      {!stateTeacher?<Outlet/>:<Navigate to="/"/>}
    </div>
  )
}

export default PrivateTeacherLogin
