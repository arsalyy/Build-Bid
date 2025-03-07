import React from 'react'
import { makeStyles, Button, Typography } from '@material-ui/core'
import Logo from '../../images/logo-black.png'
import { Link, useNavigate } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'

const Header: React.FC = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 991px)' })
  const hideLogo = useMediaQuery({ query: '(max-width: 450px)' })
  const navigate = useNavigate()

  const classes = makeStyles({
    myNav: {
      height: isMobile ? '' : '90px',
      maxWidth: '1220px',
      margin: '0px auto',
      padding: '0px 10px',
      paddingTop: isMobile ? (hideLogo ? '25px' : '12.5px') : '',
      paddingBottom: isMobile ? (hideLogo ? '25px' : '12.5px') : '',
      boxShadow: '37px 14px 20px -20px #fff'
    },
    myContainer: {
      height: '100%',
      alignItems: 'center'
    },
    button: {
      color: 'white',
      padding: '8px 20px',
      height: '40px'
    },
    myItem: {
      padding: '8px 16px',
      '&:hover': {
        backgroundColor: 'rgba(172, 174, 183, 0.1)',
        color: 'black'
      }
    },
    myCollapsable: {
      paddingTop: isMobile ? (hideLogo ? '25px' : '12.5px') : ''
    }
  })()

  return (
    <nav className={`navbar navbar-expand-lg navbar-light bg-white ${classes.myNav}`}>
      <div className={`container-fluid ${classes.myContainer}`}>
        {!hideLogo && (
          <a className="navbar-brand" href="/">
            <img src={Logo} width={'140px'} height={'55px'} alt="Build-Bid" />
          </a>
        )}
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
        {isMobile && (
          <Button onClick={() => navigate('/start')} color="primary" className={classes.button} variant="contained">
            <Typography variant="body1">GET INSTANT QUOTE</Typography>
          </Button>
        )}
        <div className={`collapse navbar-collapse ${classes.myCollapsable}`} id="navbarNav">
          <ul className="navbar-nav">
            <li className={`nav-item ${classes.myItem}`}>
              <Link className="nav-link" to="/about">
                <Typography variant="body1">About Us</Typography>
              </Link>
            </li>
            <li className={`nav-item ${classes.myItem}`}>
              <Link className="nav-link" to="/contact">
                <Typography variant="body1">Contact Us</Typography>
              </Link>
            </li>
            {isMobile && (
              <>
                <li className={`nav-item ${classes.myItem}`}>
                  <Link className="nav-link" to="/login">
                    <Typography variant="body1">Log-In</Typography>
                  </Link>
                </li>
                <li className={`nav-item ${classes.myItem}`}>
                  <Link className="nav-link" to="/signup">
                    <Typography variant="body1">Sign-Up</Typography>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
        {!isMobile && (
          <Button onClick={() => navigate('/start')} color="primary" className={classes.button} variant="contained">
            <Typography variant="body1">GET INSTANT QUOTE</Typography>
          </Button>
        )}
      </div>
    </nav>
  )
}

export default Header
