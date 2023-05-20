import React from 'react'
import { Box, makeStyles, Divider, Grid, styled, Typography } from '@material-ui/core'
import { useMediaQuery } from 'react-responsive'
import Header from 'components/shared/header'
import EstimationBreakdown from 'components/quote/estimationBreakdown'
import BidBox from 'components/quote/bidBox'

const Quote: React.FC = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 960px)' })

  const MyTitle = styled(Typography)({
    fontWeight: 800,
    color: '#252A41'
  })

  const MySubtitle = styled(Typography)({
    color: '#252A41',
    marginTop: '23px',
    fontWeight: 400,
    lineHeight: isMobile ? '25px' : '32px'
  })

  const PolicyTypography = styled(Typography)({
    fontWeight: 600,
    color: '#252A41',
    display: 'inline'
  })

  const MyEstimationTitle = styled(Typography)({
    fontStyle: 'normal',
    fontWeight: 400,
    color: '#576A94'
  })

  const classes = makeStyles(() => {
    return {
      PageWrapper: {
        background: '#FFFFFF',
        minHeight: '100vh'
      },
      HeaderWrapper: {
        padding: isMobile ? '0.4rem 1.25rem 0.6rem' : '0.6rem 5.75rem 0.5rem 6.3rem'
      },
      ContentWrapper: {
        padding: isMobile ? '2.2rem 1.15rem 8rem 1.25rem' : '3.7rem 6.9rem 6rem 6.3rem'
      },
      estimation: {
        marginTop: isMobile ? '1.438rem' : '2rem',
        lineHeight: isMobile ? '25px' : '30px'
      },
      payBox: {
        display: 'flex',
        justifyContent: isMobile ? 'center' : 'flex-end',
        width: '100%'
      }
    }
  })()

  const estimations = [
    {
      name: 'Bricks, Cement, Sand and Crush',
      price: 384.08
    },
    {
      name: 'Excavation & Steel Reinforcement',
      price: 160.08
    },
    {
      name: 'Labor Cost',
      price: 180.08
    }
  ]

  return (
    <Box className={classes.PageWrapper}>
      <Box className={classes.HeaderWrapper}>
        <Header />
      </Box>
      <Divider style={{ position: 'absolute', width: '100%', left: '0 ', background: '#CDD6E9' }} />
      <Box className={classes.ContentWrapper}>
        <Grid container>
          <Grid item md={6} lg={8} xs={12} sm={12}>
            <Box style={{ maxWidth: '731px' }}>
              <MyTitle variant="h2">1 Kanal</MyTitle>
              <MySubtitle variant="h3">
                Your project is estimated under the &nbsp;
                <PolicyTypography variant="h3">Build-Bid House Estimation Policy.</PolicyTypography>
              </MySubtitle>
              <MyEstimationTitle className={classes.estimation} variant="h4">
                <>
                  This Estimation includes&nbsp;
                  <span style={{ fontWeight: 600 }}>Labor Cost</span>,&nbsp;<span style={{ fontWeight: 600 }}>Material Cost</span>
                  ,&nbsp;
                  <span style={{ fontWeight: 600 }}>Equipment Expenses</span>&nbsp;and other&nbsp;
                  <span style={{ fontWeight: 600 }}>Miscellaneous Expenses</span>
                  &nbsp;as well.
                </>
              </MyEstimationTitle>
              <Box>
                <Box style={{ marginTop: isMobile ? '25px' : '40px' }}>
                  <Typography style={{ fontWeight: 500 }}>YOU HAVE ESTIMATION FOR</Typography>
                </Box>
                {estimations?.map((estimate, index) => {
                  return <EstimationBreakdown key={index} name={estimate.name} price={estimate.price} />
                })}
              </Box>
            </Box>
          </Grid>
          <Grid md={6} lg={4} xs={12} sm={12} style={{ marginTop: isMobile ? '30px' : '' }}>
            <Box className={classes.payBox}>
              <BidBox lowest={450.0} highest={850.0} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default Quote
