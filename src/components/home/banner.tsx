import React from 'react'
import { Box, Typography, makeStyles, Button } from '@material-ui/core'
import { useNavigate } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'

const Banner: React.FC = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 991px)' })
  const navigate = useNavigate()

  const classes = makeStyles({
    wrapper: {
      zIndex: 1,
      height: 'auto',
      minHeight: '8vh',
      backgroundColor: '#30364d',
      justifyContent: 'center',
      alignItems: 'center',
      padding: ' 14px 57px',
      fontFamily: 'Montserrat, sans-serif',
      display: 'flex',
      position: 'relative'
    },
    bar: {
      width: '2px',
      height: '120px',
      color: '#fff',
      backgroundColor: '#fff'
    },
    typo: {
      color: '#fff',
      fontWeight: 400,
      lineHeight: '24px',
      fontSize: '15px'
    },
    typoBox: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      textAlign: 'end',
      marginRight: '50px',
      maxWidth: '450px',
      width: '100%'
    },
    buttonBox: {
      marginLeft: '50px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      maxWidth: '450px',
      width: '100%'
    },
    button: {
      backgroundColor: '#fff',
      color: '#30364d',
      padding: '8px 20px',
      height: '40px'
    }
  })()
  return !isMobile ? (
    <Box className={classes.wrapper}>
      <Box className={classes.typoBox}>
        <Typography className={classes.typo}>
          <strong>Build your budget with confidence:</strong> Our website delivers reliable construction cost estimates for your
          home
        </Typography>
      </Box>
      <div className={classes.bar} />
      <Box className={classes.buttonBox}>
        <Typography className={classes.typo}>Join now! And let&apos;s get begin</Typography>
        <Box style={{ display: 'flex', gap: '20px' }}>
          <Button onClick={() => navigate('/signup')} className={classes.button} variant="contained">
            <Typography variant="body1">Sign-Up</Typography>
          </Button>
          <Button onClick={() => navigate('/login')} className={classes.button} variant="contained">
            <Typography variant="body1">Log-In</Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  ) : null
}

export default Banner
