import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, makeStyles, Divider, Grid } from '@material-ui/core'
import { useMediaQuery } from 'react-responsive'
import Header from 'components/shared/header'
import { parseQuery } from 'utilities'
import { useLocation, useNavigate } from 'react-router-dom'
import GeneralQuestions from 'components/details/generalQuestions'
import SecurityQuestions from 'components/details/securityQuestions'
import FloorPlanConfirmation from 'components/details/floorPlanConfirmation'
import { PRICES_ENDPOINT } from '../../constants'
import { setPrices } from 'actions/priceAction'
import { useDispatch } from 'react-redux'

const Details: React.FC = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 960px)' })
  const [step, setStep] = useState<number>(1)
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const classes = makeStyles(() => {
    return {
      pageBox: { background: '#FFFFFF', minHeight: '100vh' },
      headerBox: { padding: isMobile ? '0.4rem 1.25rem 0.6rem' : '0.6rem 5.75rem 0.5rem 6.3rem' },
      contentBox: { padding: isMobile ? '2.2rem 1.15rem 1.15rem 1.25rem' : '3.7rem 6.9rem 6rem 6.3rem' },
      marginbox: { maxWidth: 'auto', marginRight: isMobile ? '' : '1rem' }
    }
  })()

  useEffect(() => {
    window.scrollTo(0, 0)
    const stepper = parseInt(parseQuery(location.search)?.step as string)
    if (!stepper) {
      const searchParams = new URLSearchParams(location.search)
      searchParams.set('step', '1')
      const newSearch = searchParams.toString()
      navigate({
        ...location,
        search: newSearch
      })
    } else {
      setStep(stepper)
    }
  }, [location])

  const makeApiCall = async () => {
    try {
      const res = await axios.post(`${PRICES_ENDPOINT}/findMany`)
      if (res.status === 200)
        dispatch(
          setPrices({
            ...res.data.data.bricks.options,
            ...res.data.data.cement.options,
            ...res.data.data.sand.options,
            ...res.data.data.crush.options
          })
        )
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    makeApiCall()
  }, [])

  return (
    <Box className={classes.pageBox}>
      <Box className={classes.headerBox}>
        <Header />
      </Box>
      <Divider style={{ position: 'absolute', width: '100%', left: '0 ', background: '#CDD6E9' }} />
      <Box className={classes.contentBox}>
        <Grid container>
          <Grid item sm={12} xs={12} md={7} lg={7}>
            <Box className={classes.marginbox}>
              {step === 1 && <GeneralQuestions />}
              {step === 2 && <FloorPlanConfirmation />}
              {step === 3 && <SecurityQuestions />}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default Details
