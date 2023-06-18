import { ROUTES } from './constants'
import React, { useState, useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import {
  validateDetailsPageStep1,
  validateDetailsPageStep2,
  validateDetailsPageStep3,
  validateStartPage
} from './utilities/validation'
import { parseQuery } from './utilities'
import { IStartReducer } from 'interfaces/start/IStart'
import { useSelector } from 'react-redux'
import { IDetailsReducer } from 'interfaces/details/IDetails'

interface IAppRoute {
  Component: React.FC
}

const AppRoute: React.FC<IAppRoute> = ({ Component }) => {
  const [redirectPath, setRedirectPath] = useState<string>(null)
  const location = useLocation()
  const startReducer: IStartReducer = useSelector((state) => state.startReducer)
  const detailsReducer: IDetailsReducer = useSelector((state) => state.detailsReducer)

  useEffect(() => {
    switch (location.pathname) {
      case ROUTES.Start:
        setRedirectPath(null)
        break
      case ROUTES.Details: {
        switch (parseInt(parseQuery(location.search)?.step as string)) {
          case 1:
            validateStartPage(startReducer) ? setRedirectPath(null) : setRedirectPath(ROUTES.Start)
            break
          case 2:
            validateDetailsPageStep1(detailsReducer) ? setRedirectPath(null) : setRedirectPath(`${ROUTES.Details}?step=1`)
            break
          case 3:
            validateDetailsPageStep2(detailsReducer) ? setRedirectPath(null) : setRedirectPath(`${ROUTES.Details}?step=2`)
            break
          default:
            validateStartPage(startReducer) ? setRedirectPath(null) : setRedirectPath(ROUTES.Start)
            break
        }
        break
      }
      case ROUTES.Quote:
        validateDetailsPageStep3(detailsReducer) ? setRedirectPath(null) : setRedirectPath(`${ROUTES.Details}?step=3`)
        break
      default:
        setRedirectPath('/')
        break
    }
  }, [location])

  return redirectPath ? <Navigate replace={true} to={redirectPath} /> : <Component />
}

export default AppRoute
