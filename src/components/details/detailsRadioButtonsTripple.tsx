import React, { useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import {
  styled,
  makeStyles,
  Typography,
  RadioGroup,
  ClickAwayListener,
  FormControlLabel,
  Radio,
  useTheme
} from '@material-ui/core'

import { ITheme } from 'interfaces/shared/ITheme'
import { IOption } from 'interfaces/details/IDetails'
import MyTooltip from '../shared/tooltip'
import { generateTooltipTitle } from 'utilities'
import { useSelector } from 'react-redux'

interface IDetailsRadioButtons {
  question: string
  // eslint-disable-next-line no-unused-vars
  handleRadioChange(event: any): void
  value: string
  options: IOption[]
  tooltip?: boolean
}

const MyOperateQuestion = styled(Typography)({
  fontWeight: 500,
  color: '#252A41',
  marginTop: '50px'
})
const MyFormControlBox = styled(FormControlLabel)({
  height: '50px',
  borderRadius: '10px',
  marginTop: '4px'
})

const DetailsRadioButtonsTripple: React.FC<IDetailsRadioButtons> = (props: IDetailsRadioButtons) => {
  const { question, handleRadioChange, value, options, tooltip } = props
  const isMobile = useMediaQuery({ query: '(max-width: 960px)' })
  const primaryColor = useTheme<ITheme>().palette.primary.main
  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false)
  const prices = useSelector((state) => state.priceReducer)

  const classes = makeStyles({
    MyFormControlNotSelectedField: {
      border: 'none',
      color: value === 'one' ? '#252A41' : '#576A94',
      width: isMobile ? '33%' : '170px',
      height: isMobile ? '50px' : '56px',
      marginLeft: '',
      marginRight: isMobile ? 0 : '23px',
      '& .MuiFormControlLabel-label ': {
        marginLeft: '6px'
      }
    },
    MyFormControlSelectedField: {
      color: '#252A41',
      width: isMobile ? '33%' : '170px',
      height: isMobile ? '50px' : '56px',
      marginLeft: '',
      marginRight: isMobile ? 0 : '23px',
      border: 'none',
      '& .MuiFormControlLabel-label ': {
        marginLeft: '6px'
      }
    },
    radioWrap: {
      '&.MuiFormGroup-root': {
        flexWrap: isMobile ? 'wrap' : 'nowrap',
        justifyContent: isMobile ? 'space-evenly' : ''
      },
      '& .MuiRadio-root': {
        color: '#576A94'
      },
      '& .Mui-checked ': {
        color: primaryColor
      }
    }
  })()

  const setRadioChange = (event) => {
    handleRadioChange(event)
  }

  const handleTooltipClose = () => {
    setTooltipOpen(false)
  }
  const handleTooltipOpen = () => {
    setTooltipOpen(true)
  }

  return (
    <React.Fragment>
      <MyOperateQuestion variant="h5">
        {question}
        {tooltip && (
          <ClickAwayListener onClickAway={handleTooltipClose}>
            <Typography
              onClick={handleTooltipOpen}
              style={{
                marginLeft: '5px',
                display: 'inline'
              }}>
              <MyTooltip
                state={tooltipOpen}
                title={generateTooltipTitle(options, prices)}
                float="none"
                fontSize={isMobile ? '0.75rem' : ''}
              />{' '}
            </Typography>
          </ClickAwayListener>
        )}
      </MyOperateQuestion>
      <RadioGroup id={`details-triple-input`} className={classes.radioWrap} row={true} value={value} onChange={setRadioChange}>
        <MyFormControlBox
          id="details-triple-input-option-1"
          className={options[0].id === value ? classes.MyFormControlSelectedField : classes.MyFormControlNotSelectedField}
          value={options[0].id}
          control={<Radio id={options[0].id} color="primary" />}
          label={<Typography variant="h5">{options[0].value}</Typography>}
        />
        <MyFormControlBox
          id="details-triple-input-option-2"
          className={options[1].id === value ? classes.MyFormControlSelectedField : classes.MyFormControlNotSelectedField}
          value={options[1].id}
          control={<Radio id={options[1].id} color="primary" />}
          label={<Typography variant="h5">{options[1].value}</Typography>}
        />
        <MyFormControlBox
          id="details-triple-input-option-3"
          className={options[2].id === value ? classes.MyFormControlSelectedField : classes.MyFormControlNotSelectedField}
          value={options[2].id}
          control={<Radio id={options[2].id} color="primary" />}
          label={<Typography variant="h5">{options[2].value}</Typography>}
        />
      </RadioGroup>
    </React.Fragment>
  )
}

export default DetailsRadioButtonsTripple
