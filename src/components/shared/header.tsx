import React from 'react'
import { useMediaQuery } from 'react-responsive'
import StepperForm from './navigation'
import { Grid, Typography, Box, IconButton, makeStyles } from '@material-ui/core'
import Img from '../../images/headerImg.png'
import Back from '../../images/back.png'
import { ROUTES } from '../../constants'
import { useNavigate, useLocation } from 'react-router-dom'

const Header: React.FC = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 960px)' })
  const location = useLocation()
  const navigate = useNavigate()

  const classes = makeStyles(() => {
    return {
      MyBackButton: {
        float: 'left',
        padding: '0px 0px',
        fontWeight: 600,
        ...(isMobile ? { color: '#000000' } : { color: '#576A94' }),
        '&:hover': {
          backgroundColor: 'transparent'
        }
      },
      MyIconsContainer: {
        display: 'flex',
        alignItems: isMobile ? 'center' : '',
        gap: '10px',
        ...(isMobile ? { gap: '0' } : {})
      },
      stepperbox: {
        ...(isMobile
          ? { width: '190px', minWidth: '190px', maxWidth: '190px' }
          : { width: '400px', minWidth: '400px', maxWidth: '400px' })
      },
      power: {
        marginBottom: isMobile ? '-5px' : '0px',
        fontSize: isMobile ? '7px' : '11px',
        fontWeight: 300,
        color: '#576A94'
      }
    }
  })()

  const onBack = () => {
    const routes = Object.values(ROUTES)
    const index = routes.findIndex((route) => route === location.pathname)
    navigate(routes[index - 1])
  }

  const MobileView = () => {
    return (
      <Box>
        <Box
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            minHeight: '45px'
          }}>
          <IconButton className={classes.MyBackButton} onClick={onBack} disableRipple>
            <img src={Back} style={{ width: '8px', height: '14px', marginTop: '0.5rem' }} />
          </IconButton>
          <Box display="flex" justifyContent="center">
            <Box className={classes.stepperbox}>
              <StepperForm />
            </Box>
          </Box>
          <Box className={classes.MyIconsContainer}>
            <Box mr={0}>
              <Typography className={classes.power}>Powered By</Typography>
              <img src={Img} style={{ width: '50px', height: '10px', marginTop: '5px' }} />
            </Box>
          </Box>
        </Box>
      </Box>
    )
  }

  const DesktopView = () => {
    return (
      <Grid container alignItems="center">
        <Grid item xs={3}>
          <IconButton className={classes.MyBackButton} onClick={onBack} disableRipple>
            <img src={Back} style={{ width: '8px', height: '14px', marginRight: '0.5rem' }} />
            <Typography variant="h5" style={{ color: isMobile ? '#000000' : '#576A94', fontStyle: 'italic', fontWeight: 600 }}>
              Back
            </Typography>
          </IconButton>
        </Grid>
        <Grid item xs={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box display="flex" justifyContent="center">
            <Box className={classes.stepperbox}>
              <StepperForm />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box justifyContent="flex-end" display="flex">
            <Box>
              <Typography className={classes.power}>Powered By</Typography>
              <img src={Img} style={{ width: '100px', height: '15px' }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    )
  }

  return isMobile ? MobileView() : DesktopView()
}

export default Header
