import React from 'react'
import { Box, Typography, makeStyles } from '@material-ui/core'
import Img from '../../images/hero.png'
import { useMediaQuery } from 'react-responsive'

const Hero: React.FC = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 991px)' })

  const classes = makeStyles({
    wrapper: {
      zIndex: 2,
      width: '100%',
      maxWidth: '1440px',
      backgroundColor: '#ffffff',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: '0 auto',
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 400,
      position: 'relative',
      display: 'flex',
      padding: '50px 90px',
      textAlign: isMobile ? 'center' : 'start'
    },
    heading: {
      fontWeight: 800,
      fontSize: '46px',
      lineHeight: '60px',
      color: '#30364d'
    }
  })()
  return (
    <Box className={classes.wrapper}>
      <Typography className={classes.heading}>World&apos;s fastest estimation for home construction</Typography>
      {!isMobile && <img src={Img} width="55%" height="400px" />}
    </Box>
  )
}

export default Hero
