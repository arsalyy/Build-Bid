import React from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import { useMediaQuery } from 'react-responsive'

const Mission: React.FC = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 991px)' })

  const classes = makeStyles({
    wrapper: {
      padding: isMobile ? '25px 0px' : '50px 0px',
      backgroundColor: '#5fc5d4',
      textAlign: 'center'
    }
  })()

  return (
    <div className={classes.wrapper}>
      <Typography style={{ color: 'white', fontWeight: 700, marginBottom: '30px' }} variant="subtitle2">
        Our Mission
      </Typography>
      <Typography style={{ color: 'white', fontWeight: 200, margin: '0px auto', maxWidth: '500px' }} variant="h5">
        {`Build-Bid's ability to provide rapid and accurate cost estimations, ensuring users can make informed decisions and
        progress smoothly with their residential construction projects.`}
        <br />
        <br />
        {`We want to become the go-to one-stop solution for both; the customers (which want to build their house) and the builders (who want to take on projects to sustain their business).`}
      </Typography>
    </div>
  )
}

export default Mission
