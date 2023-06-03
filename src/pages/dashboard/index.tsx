import React from 'react'
import { Box, makeStyles, Divider, Button, useTheme, Typography, styled } from '@material-ui/core'
import { useMediaQuery } from 'react-responsive'
import Header from '../../components/shared/header'
import { ITheme } from 'interfaces/shared/ITheme'
import ResumeQuote from '../../images/ResumeQuote.png'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import UsersView from 'components/dashboard/usersView'
import BuildersView from 'components/dashboard/buildersView'

const BodyText = styled(Typography)({
  fontSize: '18px',
  fontWeight: 500
})

const Dashboard: React.FC = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 960px)' })
  const secondaryColor = useTheme<ITheme>().palette.secondary.main
  const name = useSelector((state) => state.userReducer.name)
  const navigate = useNavigate()
  const user = useSelector((state) => state.userReducer.type)

  const classes = makeStyles(() => {
    return {
      pageBox: { background: '#FFFFFF', minHeight: '100vh' },
      headerBox: { padding: isMobile ? '22px 20px' : '30px 100px' },
      pageWrap: { padding: isMobile ? '2.188rem 1.75rem' : '2.188rem 6.25rem' },
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

  return (
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
              {user === 'builder' ? 'Get the best construction projects at best prices' : 'Get the best price for your project'}
            </Typography>
            {user === 'builder' ? (
              <BodyText style={{ fontWeight: 400, marginTop: isMobile ? '29px' : '40px' }}>
                You can count on us to get right projects for you and at the right prices.&nbsp;
                <strong>Find the best projects for you and bid on them.</strong>
              </BodyText>
            ) : (
              <BodyText style={{ fontWeight: 400, marginTop: isMobile ? '29px' : '40px' }}>
                You can count on us to get right estimation for your project at best prices.&nbsp;
                <strong>Get your quote in seconds.</strong>
              </BodyText>
            )}
            <Box
              style={{
                marginTop: isMobile ? '30px' : '40px',
                display: isMobile ? 'flex' : '',
                justifyContent: isMobile ? 'space-between' : ''
              }}>
              {user !== 'builder' && (
                <Button onClick={() => navigate('/start')} color="primary" variant="contained" className={classes.resumeQuote}>
                  Get Instant Quote
                </Button>
              )}
            </Box>
          </Box>
          <Box style={{ paddingTop: '4px', paddingBottom: '19.31px', marginBottom: isMobile ? '22px' : '' }}>
            <img src={ResumeQuote} width={isMobile ? '230px' : '330px'} height={isMobile ? '200px' : '286px'} />
          </Box>
        </Box>

        {user === 'builder' ? <BuildersView /> : <UsersView />}

        <Divider style={{ marginTop: '60px', width: '100%', left: '0 ', background: '#000000' }} />
      </Box>
    </Box>
  )
}

export default Dashboard
