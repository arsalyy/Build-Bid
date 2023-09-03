import React, { useState, useEffect } from 'react'
import { Box, makeStyles, Divider, Grid, styled, Typography } from '@material-ui/core'
import { useMediaQuery } from 'react-responsive'
import Header from 'components/shared/header'
import EstimationBreakdown from 'components/quote/estimationBreakdown'
import BidBox from 'components/quote/bidBox'
import Transition from 'components/quote/transition'
import { getQuotePayload, comparePayloadForApiCall } from 'utilities'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { QUOTE_ENDPOINT } from '../../constants'
import { setQuoteReducer } from 'actions/quoteAction'

const Quote: React.FC = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 960px)' })
  const [isQuoteLoading, setIsQuoteLoading] = useState<boolean>(false)
  const [secondImage, setSecondImage] = useState<boolean>(false)
  const state = useSelector((state) => state)
  const dispatch = useDispatch()
  const quoteId = useSelector((state) => state.quoteReducer._id)
  const quote = useSelector((state) => state.quoteReducer.quote)
  const data = useSelector((state) => state.quoteReducer)

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

  const onMount = async () => {
    const payload = getQuotePayload(state)

    if (!quoteId || quoteId === '' || comparePayloadForApiCall(payload, data)) {
      try {
        const res = await axios.post(`${QUOTE_ENDPOINT}/create`, {
          ...payload
        })
        if (res.status === 200) dispatch(setQuoteReducer(res.data.body))
      } catch (error) {
        console.error(error)
      }
    }

    setTimeout(() => {
      setSecondImage(true)
    }, 2000)
    setTimeout(() => {
      setIsQuoteLoading(false)
    }, 4000)
  }

  useEffect(() => {
    setIsQuoteLoading(true)
    window.scrollTo(0, 0)
    onMount()
  }, [])

  return isQuoteLoading ? (
    <Transition showSecondImage={secondImage} />
  ) : (
    <Box className={classes.PageWrapper}>
      <Box className={classes.HeaderWrapper}>
        <Header />
      </Box>
      <Divider style={{ position: 'absolute', width: '100%', left: '0 ', background: '#CDD6E9' }} />
      <Box className={classes.ContentWrapper}>
        <Grid container>
          <Grid item md={6} lg={8} xs={12} sm={12}>
            <Box style={{ maxWidth: '731px' }}>
              <MyTitle variant="h2">
                {data?.areaInMarla} Marla (
                {data?.generalQuestions?.storey?.charAt(0).toUpperCase() + data?.generalQuestions?.storey?.slice(1)} Storey)
              </MyTitle>
              <MySubtitle variant="h3">
                Your project is estimated under the &nbsp;
                <PolicyTypography variant="h3">Build-Bid House Estimation Policy.</PolicyTypography>
              </MySubtitle>
              <MyEstimationTitle className={classes.estimation} variant="h4">
                <>
                  This Estimation includes&nbsp;
                  {data?.quote?.breakdown?.map((item, index) => (
                    <>
                      <span key={index} style={{ fontWeight: 600 }}>
                        {item.label}
                      </span>
                      {data?.quote?.breakdown?.length - 1 === index ? (
                        <>.</>
                      ) : data?.quote?.breakdown?.length - 2 === index ? (
                        <>&nbsp;and&nbsp;</>
                      ) : (
                        <>,&nbsp;</>
                      )}
                    </>
                  ))}
                </>
              </MyEstimationTitle>
              <Box>
                <Box style={{ marginTop: isMobile ? '25px' : '40px' }}>
                  <Typography style={{ fontWeight: 500 }}>YOU HAVE ESTIMATION FOR</Typography>
                </Box>
                {data?.quote?.breakdown?.map((item, index) => {
                  return <EstimationBreakdown key={index} name={item.label} price={item.cost} data={item} />
                })}
              </Box>
            </Box>
          </Grid>
          <Grid md={6} lg={4} xs={12} sm={12} style={{ marginTop: isMobile ? '30px' : '' }}>
            <Box className={classes.payBox}>
              <BidBox price={quote?.price ?? 0} range={quote?.range} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default Quote
