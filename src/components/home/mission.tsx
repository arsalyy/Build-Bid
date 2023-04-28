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
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s
        standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type
        specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
        passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </Typography>
    </div>
  )
}

export default Mission
