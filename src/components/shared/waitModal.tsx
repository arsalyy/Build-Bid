import React from 'react'
import { Box, makeStyles, Typography, Button } from '@material-ui/core'
import { useMediaQuery } from 'react-responsive'
import { useNavigate } from 'react-router-dom'

const WaitModal: React.FC = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 960px)' })
  const navigate = useNavigate()

  const classes = makeStyles({
    outerBox: {
      position: 'fixed',
      zIndex: 99999,
      paddingTop: '100px',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      overflow: 'auto',
      backdropFilter: 'blur(25px)'
    },
    mainBox: {
      display: isMobile ? 'grid' : 'flex',
      position: 'absolute',
      left: '50%',
      top: '50%',
      zIndex: 999999,
      backgroundColor: '#fff',
      transform: 'translate(-50%, -50%)',
      width: isMobile ? '335px' : '700px',
      borderRadius: '6px'
    },
    rightBox: {
      padding: isMobile ? '30px 20px' : '40px'
    },
    button: {
      color: 'white',
      padding: '8px 20px',
      height: '40px',
      marginTop: '30px'
    }
  })()

  return (
    <Box className={classes.outerBox}>
      <Box className={classes.mainBox}>
        <Box className={classes.rightBox}>
          <Typography style={{ fontSize: '20px', fontWeight: '800', textAlign: isMobile ? 'center' : 'start' }}>
            Hang in There!
          </Typography>
          <Typography style={{ fontSize: '20px', fontWeight: '800', textAlign: isMobile ? 'center' : 'start' }}>
            We&apos;re working on your request.
          </Typography>
          <Typography
            style={{
              fontSize: '13px',
              fontWeight: '500',
              textAlign: isMobile ? 'center' : 'start',
              color: '#545464',
              marginTop: '20px'
            }}>
            Our team is working on your profile. Once your identity is being verified, you&apos;ll get an email from us. Thanks
            for you patience!
          </Typography>
          <Button onClick={() => navigate('/')} color="primary" className={classes.button} variant="contained">
            <Typography variant="body1">Back to Home</Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default WaitModal
