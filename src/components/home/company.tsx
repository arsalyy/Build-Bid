import React from 'react'
import { makeStyles, Typography, Box } from '@material-ui/core'
import { useMediaQuery } from 'react-responsive'

const Company: React.FC = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 991px)' })

  const classes = makeStyles({
    wrapper: {
      padding: isMobile ? '25px 35px' : '50px 80px',
      backgroundColor: '#ffffff',
      display: 'flex'
    }
  })()

  return (
    <div className={classes.wrapper}>
      <Box style={{ width: '50%' }}>
        <Typography style={{ color: 'black', fontWeight: 700, marginBottom: '30px' }} variant="subtitle2">
          World&apos;s fastest estimation for home construction
        </Typography>
      </Box>
      <Box style={{ width: '50%' }}>
        <Box style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <Typography style={{ color: 'black', fontWeight: 200, margin: '0px auto' }} variant="h5">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s
            standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
            type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining
            essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
            passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </Typography>
          <Typography style={{ color: 'black', fontWeight: 200, margin: '0px auto' }} variant="h5">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s
            standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
            type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining
            essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
            passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </Typography>
        </Box>
      </Box>
    </div>
  )
}

export default Company
