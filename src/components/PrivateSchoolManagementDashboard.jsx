import React, { useContext } from 'react'
import SchoolManagementLogin from './SchoolManagementLogin'
import { Outlet } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { Context } from './Context'
import { useSelector } from 'react-redux'

const PrivateSchoolManagementDashboard = () => {
    const managementToken = useSelector(state=>state.managementToken)


  return (
    <div>
        {managementToken?<Outlet/>:<Navigate to='/managementlogin'/>}
    </div>
  )
}

export default PrivateSchoolManagementDashboard
