import React from 'react'
import { Box, Typography, makeStyles } from '@material-ui/core'
import { useMediaQuery } from 'react-responsive'
import Kim from '../../images/kimBot.svg'

const Bot: React.FC = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 960px)' })

  const classes = makeStyles(() => {
    return {
      mainBox: {
        padding: '20px',
        borderRadius: '10px',
        maxWidth: isMobile ? '100%' : '334px',
        boxShadow: '0px 4px 20px rgba(177, 176, 176, 0.18)'
      },
      topBox: {
        display: 'flex'
      },
      descriptionBox: {
        marginTop: '15px',
        backgroundColor: '#FBFBFB',
        borderRadius: '0px 15px 15px',
        padding: '15px',
        color: '#545464',
        fontWeight: 500
      }
    }
  })()

  return (
    <React.Fragment>
      <Box className={classes.mainBox}>
        <Box className={classes.topBox}>
          <img src={Kim} alt="Bot Pic" height={'45px'} width={'45px'} />
          <Box style={{ marginLeft: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Typography variant="body1" style={{ fontWeight: '700' }}>
              Build-Bid Bot
            </Typography>
            <Typography variant="body1" style={{ fontWeight: '600', color: '#545464' }}>
              Kim
            </Typography>
          </Box>
        </Box>
        <Box className={classes.descriptionBox}>
          <Typography variant="body1">
            Congratulations on getting your project estimation. You&apos;re just one step away from building your{' '}
            <span style={{ fontWeight: 700 }}>dream-home</span>.
          </Typography>
        </Box>
      </Box>
    </React.Fragment>
  )
}

export default Bot
