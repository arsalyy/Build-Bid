import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

interface IAuthRoute {
  Component: React.FC | React.FC<{ Component: React.FC }>
  ComponentProp?: React.FC
}

const AuthRoute: React.FC<IAuthRoute> = ({ Component, ComponentProp }) => {
  const [redirectPath, setRedirectPath] = useState<string>(null)
  const loggedIn = useSelector((state) => state.userReducer.verified)
  const type = useSelector((state) => state.userReducer.type)
  const identityVerified = useSelector((state) => state.userReducer.identityVerified)

  useEffect(() => {
    if (!loggedIn) setRedirectPath('/login')
    else if (type === 'builder' && !identityVerified) setRedirectPath('/signup')
  }, [loggedIn])

  return redirectPath ? <Navigate replace to={redirectPath} /> : <Component Component={ComponentProp} />
}

export default AuthRoute
