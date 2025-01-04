import React, { useContext } from 'react'
import SchoolManagementLogin from './SchoolManagementLogin'
import { Outlet } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { Context } from './Context'

const PrivateTeacherDashboard = () => {
    const {stateTeacher} = useContext(Context)

  return (
    <div>
        {stateTeacher?<Outlet/>:<Navigate to='/teacherlogin'/>}
    </div>
  )
}

export default PrivateTeacherDashboard
