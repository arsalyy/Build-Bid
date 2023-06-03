import React from 'react'
import { Box, makeStyles, Typography } from '@material-ui/core'
import { useMediaQuery } from 'react-responsive'

import info from '../../images/info.png'

const UsersView: React.FC = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 960px)' })

  const classes = makeStyles(() => {
    return {
      pageBox: { marginTop: '60px' },
      infoBox: {
        display: 'flex',
        alignItems: 'center',
        background: '#F9F9F9',
        borderRadius: '8px',
        padding: '20px 25px',
        marginTop: '30px',
        position: 'relative'
      },
      typoCover: {
        '& .MuiBox-root': {
          float: isMobile ? 'left' : 'unset'
        }
      }
    }
  })()

  return (
    <Box className={classes.pageBox}>
      <Typography variant="h3" style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '40px' }}>
        Your Cover
      </Typography>
      <Box className={classes.infoBox}>
        {isMobile ? (
          <>
            <Typography
              className={classes.typoCover}
              style={{ fontSize: '1.125', fontWeight: 500, marginLeft: isMobile ? '' : '20px' }}>
              <img src={info} style={{ marginRight: '5px' }} width={'14px'} height={'14px'} />
              When you have an estimation, your estimation details and their bids will all be live here.
            </Typography>
          </>
        ) : (
          <>
            <img src={info} width={'24px'} height={'24px'} />
            <Typography style={{ fontSize: '1.125', fontWeight: 500, marginLeft: '20px' }}>
              When you have an estimation, your estimation details and their bids will all be live here.
            </Typography>
          </>
        )}
      </Box>
    </Box>
  )
}

export default UsersView
