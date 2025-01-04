import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { Context } from './Context'

const PrivateSchoolManagementLogin = () => {
    const {state}=useContext(Context);

  return (

    <div>
      {!state?<Outlet/>:<Navigate to="/"/>}
    </div>
  )
}

export default PrivateSchoolManagementLogin
