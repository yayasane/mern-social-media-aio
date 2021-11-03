import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { AuthContext } from '../contexts/auth/AuthContext'
const PrivateRoute = ({ path, component }) => {
  const { user } = useContext(AuthContext)
  return user ? (
    <Route path={path} component={component} />
  ) : (
    <Redirect to="/login" />
  )
}

export default PrivateRoute
