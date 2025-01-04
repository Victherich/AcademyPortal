import React, { useContext } from 'react'
import SchoolManagementLogin from './SchoolManagementLogin'
import { Outlet } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { Context } from './Context'
import { useSelector } from 'react-redux'

const PrivateStudentDashboard = () => {
  const studentToken = useSelector(state=>state.studentToken)

  return (
    <div>
        {studentToken?<Outlet/>:<Navigate to='/studentlogin'/>}
    </div>
  )
}

export default PrivateStudentDashboard
