import React, { useEffect, useState } from 'react'
import { Box, makeStyles, Divider, Grid } from '@material-ui/core'
import { useMediaQuery } from 'react-responsive'
import Header from 'components/shared/header'
import { parseQuery } from 'utilities'
import { useLocation } from 'react-router-dom'
import GeneralQuestions from 'components/details/generalQuestions'
import SecurityQuestions from 'components/details/securityQuestions'
import FloorPlanConfirmation from 'components/details/floorPlanConfirmation'

const Details: React.FC = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 960px)' })
  const [step, setStep] = useState<number>(1)
  const location = useLocation()

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
    !stepper ? setStep(1) : setStep(stepper)
  }, [location])

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
