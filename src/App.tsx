import React from 'react'
import './App.css'
import { TextField, makeStyles, useTheme } from '@material-ui/core'
import { ITheme } from 'interfaces/shared/ITheme'

const App = () => {
  const primaryColor = useTheme<ITheme>().palette.primary.main

  const classes = makeStyles({
    myEmailField: {
      marginTop: '25px',
      '& .MuiOutlinedInput-root': {
        borderRadius: '10px',
        padding: '2px',
        fontWeight: 500
      },
      '& .MuiInputLabel-root': {
        color: primaryColor
      },
      '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: primaryColor
      },
      '& .MuiOutlinedInput-root:focus-within .MuiOutlinedInput-notchedOutline': {
        borderColor: primaryColor
      },
      '& .MuiOutlinedInput-notchedOutline': { borderColor: '#CDD6E9' }
    }
  })()

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Features
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Pricing
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" href="#" tabIndex={-1} aria-disabled="true">
                  Disabled
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <TextField
        className={classes.myEmailField}
        fullWidth
        value={''}
        label="Email Address"
        onChange={(event: React.ChangeEvent<{ value: string }>) => console.log(event.target.value)}
        variant="outlined"
      />
    </>
  )
}

export default App
