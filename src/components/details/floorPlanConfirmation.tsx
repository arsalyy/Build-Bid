import React, { useState, useEffect } from 'react'
import { makeStyles, Grid, useTheme, Typography, styled, Button, TextField } from '@material-ui/core'
import { useMediaQuery } from 'react-responsive'
import { ITheme } from 'interfaces/shared/ITheme'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getFloorPlan } from '../../constants'
import { squareMeterToMarla, reduceToSingleStorey } from 'utilities'
import { IFloorPlan } from 'interfaces/details/IDetails'
import { inputShadowStyle } from '../../utilities'
import { setFloorPlan } from '../../actions/detailsAction'

const MyDetailsTitle = styled(Typography)({
  color: '#252A41',
  lineHeight: 1.5
})

const FloorPlanConfirmation: React.FC = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 960px)' })
  const primaryColor = useTheme<ITheme>().palette.primary.main
  const primaryTextColor = useTheme<ITheme>().text.primary
  const location = useLocation()
  const navigate = useNavigate()
  const area = useSelector((state) => state.startReducer.area)
  const floorPlan = useSelector((state) => state.detailsReducer.floorPlan)
  const storey = useSelector((state) => state.detailsReducer.generalQuestions[0].answer)
  const [globalFloorPlan, setGlobalFloorPlan] = useState<IFloorPlan>()
  const [localFloorPlan, setLocalFloorPlan] = useState<IFloorPlan>()
  const dispatch = useDispatch()

  const classes = makeStyles(() => {
    return {
      button: {
        ...(isMobile ? { marginTop: '4rem' } : { width: '240px', marginTop: '8rem' }),
        height: '55px',
        borderRadius: '8px'
      },
      myTextField: {
        marginTop: isMobile ? '2.5rem' : '3.75rem',
        '& .MuiOutlinedInput-root': {
          borderRadius: '10px',
          padding: '2px',
          fontWeight: 500
        },
        '& .MuiInputLabel-root': {
          color: primaryColor
        },
        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: primaryColor
        },
        '& .MuiOutlinedInput-root:focus-within .MuiOutlinedInput-notchedOutline': {
          borderColor: primaryColor
        },
        '& .MuiOutlinedInput-notchedOutline': { borderColor: '#CDD6E9' }
      }
    }
  })()

  const navigateToStep = (step: string) =>
    navigate({
      pathname: location.pathname,
      search: `?step=${step}`
    })

  useEffect(() => {
    const res: IFloorPlan =
      storey === 'single' ? reduceToSingleStorey(getFloorPlan(squareMeterToMarla(area))) : getFloorPlan(squareMeterToMarla(area))
    setGlobalFloorPlan(res)
    setLocalFloorPlan(floorPlan ?? res)
  }, [])

  const mapFloorPlan = () => {
    const entries = Object.entries(localFloorPlan ?? {})

    const handleKeyPress = (event, key) => {
      const maxValue = globalFloorPlan[key]

      const keyPressedValue = event.key
      const currentValue = event.target.value + keyPressedValue

      if (parseInt(currentValue) > maxValue) {
        event.preventDefault()
      }
    }

    return entries?.map((val, index) => (
      <TextField
        key={index}
        className={classes.myTextField}
        fullWidth
        value={val[1]}
        type="number"
        label={val[0]?.charAt(0)?.toUpperCase() + val[0]?.slice(1)}
        onChange={(event: React.ChangeEvent<{ value: string }>) =>
          setLocalFloorPlan({ ...localFloorPlan, [val[0]]: parseInt(event.target.value) })
        }
        inputProps={{
          style: inputShadowStyle,
          max: globalFloorPlan[val[0]],
          min: 0,
          onKeyPress: (event) => handleKeyPress(event, val[0])
        }}
        variant="outlined"
      />
    ))
  }

  const handleClick = () => {
    dispatch(setFloorPlan({ ...globalFloorPlan, ...localFloorPlan }))
    navigateToStep('3')
  }

  return (
    <>
      <MyDetailsTitle variant="h3">
        Almost there. We just need a few <strong>details about your project preferences & quality</strong>
      </MyDetailsTitle>
      {mapFloorPlan()}
      <Grid item>
        <Button
          id="details-step-2"
          className={classes.button}
          fullWidth
          color="primary"
          onClick={handleClick}
          variant="contained">
          <Typography style={{ color: primaryTextColor }} variant="h5">
            Next
          </Typography>
        </Button>
      </Grid>
    </>
  )
}

export default FloorPlanConfirmation
