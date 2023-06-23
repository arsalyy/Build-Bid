import React from 'react'
import { makeStyles, Typography, Box } from '@material-ui/core'
import { useMediaQuery } from 'react-responsive'
import EmptyUser from '../../images/emptyUser.png'

const Team: React.FC = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 991px)' })

  const classes = makeStyles({
    wrapper: {
      padding: isMobile ? '25px 35px' : '50px 80px',
      backgroundColor: '#ffffff',
      textAlign: 'center'
    },
    card: {
      height: '100%',
      textAlign: 'center',
      backgroundColor: '#fff',
      border: '1px solid #e6e8f0',
      borderRadius: '8px',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '30px 24px',
      display: 'flex',
      position: 'relative',
      width: '-webkit-fill-available',
      marginTop: '80px'
    },
    photo: {
      borderRadius: '50%',
      marginBottom: '20px',
      paddingBottom: 0,
      position: 'relative',
      overflow: 'hidden'
    },
    name: {
      marginTop: 0,
      marginBottom: '12px',
      fontFamily: 'Montserrat, sans-serif',
      fontSize: '20px',
      fontWeight: 500,
      lineHeight: '28px'
    }
  })()

  return (
    <div className={classes.wrapper}>
      <Typography style={{ color: 'black', fontWeight: 700, marginBottom: '30px' }} variant="subtitle2">
        Our Team
      </Typography>
      <Typography style={{ color: 'black', fontWeight: 400, margin: '0px auto', maxWidth: '500px' }} variant="h5">
        {`We are a team of tech geeks, software engineers and real-estate enthusiasts with years of experience building and launching
        market competitive, real-estate products, which will target the user's pain points and fix them.`}
      </Typography>
      <Box style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '25px' }}>
        <div className={classes.card}>
          <div className={classes.photo}>
            <img src={EmptyUser} width={'160px'} height={'160px'} />
          </div>
          <Typography className={classes.name} variant="h4">
            Muhammad Arsal
          </Typography>
          <Typography style={{ color: '#798099' }} variant="h3">
            Front-End Developer & DB Administrator
          </Typography>
        </div>
        <div className={classes.card}>
          <div className={classes.photo}>
            <img src={EmptyUser} width={'160px'} height={'160px'} />
          </div>
          <Typography className={classes.name} variant="h4">
            Amad Haseeb
          </Typography>
          <Typography style={{ color: '#798099' }} variant="h3">
            Back-End Developer & Software Quality Engineer
          </Typography>
        </div>
        <div className={classes.card}>
          <div className={classes.photo}>
            <img src={EmptyUser} width={'160px'} height={'160px'} />
          </div>
          <Typography className={classes.name} variant="h4">
            Hamza Zulfiqar
          </Typography>
          <Typography style={{ color: '#798099' }} variant="h3">
            UI/UX Designer & System Architect
          </Typography>
        </div>
      </Box>
    </div>
  )
}

export default Team
