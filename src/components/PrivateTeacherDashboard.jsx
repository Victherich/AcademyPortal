import React, { useContext } from 'react'
import SchoolManagementLogin from './SchoolManagementLogin'
import { Outlet } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { Context } from './Context'
import { useSelector } from 'react-redux'

const PrivateTeacherDashboard = () => {
    // const {stateTeacher} = useContext(Context)
const teacherToken = useSelector(state=>state.teacherToken)
  return (
    <div>
        {teacherToken?<Outlet/>:<Navigate to='/teacherlogin'/>}
    </div>
  )
}

export default PrivateTeacherDashboard
