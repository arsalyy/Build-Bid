import React, { useEffect, useState } from 'react'
import { Box, makeStyles, Divider, Button, useTheme, Typography, styled } from '@material-ui/core'
import { useMediaQuery } from 'react-responsive'
import Header from '../../components/shared/header'
import { ITheme } from 'interfaces/shared/ITheme'
import ResumeQuote from '../../images/ResumeQuote.png'
import info from '../../images/info.png'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import WaitModal from '../../components/shared/waitModal'

const BodyText = styled(Typography)({
  fontSize: '18px',
  fontWeight: 500
})

const Dashboard: React.FC = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 960px)' })
  const secondaryColor = useTheme<ITheme>().palette.secondary.main
  const name = useSelector((state) => state.userReducer.name)
  const loggedIn = useSelector((state) => state.userReducer.verified)
  const type = useSelector((state) => state.userReducer.type)
  const identityVerified = useSelector((state) => state.userReducer.identityVerified)
  const navigate = useNavigate()
  const [modal, setModal] = useState<boolean>(false)

  const redirectFunction = (path) => {
    navigate(`${path}`)
  }

  useEffect(() => {
    if (!loggedIn) redirectFunction('/login')
    else if (type === 'builder' && !identityVerified) setModal(true)
  }, [loggedIn])

  const classes = makeStyles(() => {
    return {
      pageBox: { background: '#FFFFFF', minHeight: '100vh' },
      headerBox: { padding: isMobile ? '22px 20px' : '30px 100px' },
      pageWrap: { padding: isMobile ? '2.188rem 1.75rem' : '2.188rem 6.25rem' },
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
      },
      quoteWaiting: {
        backgroundColor: secondaryColor,
        display: isMobile ? 'grid' : 'flex',
        justifyItems: isMobile ? 'center' : '',
        marginTop: '40px',
        borderRadius: '10px'
      },
      resumeQuote: {
        borderRadius: '5px',
        padding: isMobile ? '12px 20px' : '19px 48px',
        color: '#fff',
        textTransform: 'capitalize',
        '& span': {
          fontSize: isMobile ? '0.8rem' : '1rem'
        }
      }
    }
  })()

  return modal ? (
    <WaitModal />
  ) : (
    <Box className={classes.pageBox}>
      <Box className={classes.headerBox}>
        <Header viewType="dashboard" />
      </Box>
      {isMobile ? <Divider /> : <></>}
      <Box className={classes.pageWrap}>
        <Box>
          <Typography style={{ fontWeight: 700, marginBottom: '30px' }} variant="h2">
            Welcome Back, {name}.
          </Typography>
          <BodyText>Welcome to your build-bid account. What would you like to do today?</BodyText>
        </Box>
        <Box className={classes.quoteWaiting}>
          <Box style={{ padding: isMobile ? '40px 15px 30px' : '60px', width: isMobile ? '100%' : '62.5%' }}>
            <Typography variant="h3" style={{ fontSize: '1.5rem', fontWeight: 600 }}>
              Get the best price for your project
            </Typography>
            <BodyText style={{ fontWeight: 400, marginTop: isMobile ? '29px' : '40px' }}>
              You can count on us to get right estimation for your project at best prices.&nbsp;
              <strong>Get your quote in seconds</strong>
            </BodyText>
            <Box
              style={{
                marginTop: isMobile ? '30px' : '40px',
                display: isMobile ? 'flex' : '',
                justifyContent: isMobile ? 'space-between' : ''
              }}>
              <Button color="primary" variant="contained" className={classes.resumeQuote}>
                Get Instant Quote
              </Button>
            </Box>
          </Box>
          <Box style={{ paddingTop: '4px', paddingBottom: '19.31px', marginBottom: isMobile ? '22px' : '' }}>
            <img src={ResumeQuote} width={isMobile ? '230px' : '330px'} height={isMobile ? '200px' : '286px'} />
          </Box>
        </Box>

        <Box style={{ marginTop: '60px' }}>
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
          <Divider style={{ marginTop: '40px' }} />
        </Box>
      </Box>
    </Box>
  )
}

export default Dashboard
