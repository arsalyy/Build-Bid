import React from 'react'
import AdminLogin from '../../components/admin/adminLogin'
import AdminTable from '../../components/admin/adminTable'
import { useSelector } from 'react-redux'

const Admin: React.FC = () => {
  const loggedIn = useSelector((state) => state.adminReducer.loggedIn)

  return !loggedIn ? <AdminLogin /> : <AdminTable />
}

export default Admin
