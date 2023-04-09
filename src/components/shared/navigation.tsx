import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import {
  withStyles,
  makeStyles,
  Step,
  Stepper,
  Box,
  styled,
  Typography,
  StepLabel,
  StepConnector,
  useTheme
} from '@material-ui/core'

import { ROUTES_VALIDATION_STEPS } from '../../constants'
import { ITheme } from 'interfaces/shared/ITheme'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  button: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  horizontal: {
    padding: '0px'
  }
}))

const Navigation: React.FC<{ rideShare?: boolean }> = ({ rideShare }) => {
  const primaryColor = useTheme<ITheme>().palette.primary.main
  const classes = useStyles()
  const steps = getSteps()
  const location = useLocation()
  const isMobile = useMediaQuery({ query: '(max-width: 960px)' })
  const [activeStep, setActiveStep] = useState(0)

  const LineConnector = withStyles({
    alternativeLabel: {
      top: isMobile ? '9px' : '15px',
      left: isMobile ? 'calc(-50% + 6px)' : 'calc(-50% + 12px)',
      right: isMobile ? 'calc(-50% + 45px)' : 'calc(50% + 11px)'
    },
    active: {
      '& $line': {
        borderColor: primaryColor
      }
    },
    completed: {
      '& $line': {
        borderColor: primaryColor
      }
    },
    line: {
      borderColor: rideShare ? '#D5DAE5' : '#D5DAE5',
      borderTopWidth: 1.8
    }
  })(StepConnector)

  const MyStepLabel = styled(StepLabel)({
    '& .MuiStepIcon-root.MuiStepIcon-completed': {
      border: '1px solid',
      borderRadius: '100%',
      padding: '2px',
      color: primaryColor,
      height: isMobile ? '19px!important' : '30px!important',
      width: isMobile ? '19px!important' : '30px!important',
      marginTop: '0px!important'
    },
    '& .MuiStepIcon-root': {
      color: rideShare ? '#D5DAE5' : '#D5DAE5',
      height: isMobile ? '15px' : '24px',
      width: isMobile ? '15px' : '24px',
      marginTop: isMobile ? '2px' : '4px'
    },
    '& .MuiStepIcon-root.MuiStepIcon-active': {
      border: '1px solid',
      height: isMobile ? '19px!important' : '30px!important',
      width: isMobile ? '19px!important' : '30px!important',
      borderRadius: '100%',
      padding: '2px',
      color: rideShare ? (isMobile ? '#252A41' : '#FFFFFF') : primaryColor,
      marginTop: '0px!important'
    },
    '& .MuiStepLabel-label.MuiStepLabel-alternativeLabel': {
      color: rideShare ? '#D5DAE5' : '#9AA6BF',
      fontWeight: 400,
      marginTop: '0.6rem'
    },
    '& .MuiStepLabel-label.MuiStepLabel-active': {
      color: rideShare ? (isMobile ? '#252A41' : '#FFFFFF') : primaryColor,
      fontWeight: 700
    },
    '& .MuiStepLabel-label.MuiStepLabel-completed': {
      color: rideShare ? (isMobile ? '#252A41' : '#FFFFFF') : primaryColor,
      fontWeight: 700
    }
  })

  const MyStepper = styled(Stepper)({
    padding: '0',
    ...(isMobile ? { marginTop: '17px' } : { marginTop: '10px' })
  })

  useEffect(() => {
    const route = ROUTES_VALIDATION_STEPS.find((r) => r.path !== '/' && location.pathname.indexOf(r.path) > -1)
    // eslint-disable-next-line no-extra-boolean-cast
    if (!!route) {
      setActiveStep(route.id - 1)
      // dispatch(getActiveStep(route.id - 1))
    }
  }, [])

  function getSteps() {
    return ['Start', 'Quote', 'Details', 'Declarations', 'Payment']
  }

  return (
    <Box className={classes.root}>
      <MyStepper
        alternativeLabel
        style={{ color: '#D5DAE5', background: rideShare ? 'transparent' : '' }}
        activeStep={activeStep}
        connector={<LineConnector />}>
        {steps.map((label) => (
          <Step key={label} style={{ color: '#D5DAE5' }} className={classes.horizontal}>
            <MyStepLabel icon={' '}>
              {isMobile ? (
                <></>
              ) : (
                <Typography variant="body2" style={{ marginTop: '-5px' }}>
                  {label}
                </Typography>
              )}
            </MyStepLabel>
          </Step>
        ))}
      </MyStepper>
    </Box>
  )
}

export default Navigation
