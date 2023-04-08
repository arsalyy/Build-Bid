import React from 'react'
import { makeStyles, Typography, Button } from '@material-ui/core'
import { useMediaQuery } from 'react-responsive'
import { useNavigate } from 'react-router-dom'

const GetQuote: React.FC = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 991px)' })
  const navigate = useNavigate()

  const classes = makeStyles({
    wrapper: {
      padding: isMobile ? '25px 0px' : '50px 0px',
      backgroundColor: '#5fc5d4',
      textAlign: 'center'
    },
    button: {
      color: 'white',
      padding: '8px 20px',
      height: '40px',
      width: 'fit-content',
      backgroundColor: '#ff515d',
      '&:hover': {
        backgroundColor: '#ff515d'
      }
    }
  })()

  return (
    <div className={classes.wrapper}>
      <Typography style={{ color: 'white', fontWeight: 700, marginBottom: '30px' }} variant="subtitle2">
        Need estimation of construction?
      </Typography>
      <Typography style={{ color: 'white', fontWeight: 200, marginBottom: '24px' }} variant="h5">
        Get quote and have construction estimation in minutes
      </Typography>
      <Button onClick={() => navigate('/start')} className={classes.button} variant="contained">
        <Typography variant="body1">GET INSTANT QUOTE</Typography>
      </Button>
    </div>
  )
}

export default GetQuote
