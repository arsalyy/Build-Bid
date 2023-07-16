import React, { useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import {
  styled,
  ClickAwayListener,
  makeStyles,
  Typography,
  RadioGroup,
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
  marginTop: '15px',
  padding: '0px 0px 0px 1rem'
})

const DetailsRadioButtons: React.FC<IDetailsRadioButtons> = (props: IDetailsRadioButtons) => {
  const { question, handleRadioChange, value, options, tooltip } = props
  const isMobile = useMediaQuery({ query: '(max-width: 960px)' })
  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false)
  const primaryColor = useTheme<ITheme>().palette.primary.main
  const prices = useSelector((state) => state.priceReducer)

  const classes = makeStyles({
    text: {
      width: '100%',
      margin: '1.2rem 0',
      fontWeight: 500,
      color: '#252A41',
      lineHeight: 1.8
    },

    actMyFormControlLabel: {
      border: '1px solid #CDD6E9',
      color: '#576A94',
      width: isMobile ? '160px' : '170px',
      height: isMobile ? '50px' : '56px'
    },
    MyFormControlSelectedField: {
      border: `1px solid ${primaryColor}`,
      color: '#252A41',
      width: isMobile ? '160px' : '170px',
      height: isMobile ? '50px' : '56px',
      borderRadius: ''
    },
    actMyFormControl: {
      border: '1px solid #CDD6E9',
      color: '#576A94',
      width: isMobile ? '160px' : '170px',
      height: isMobile ? '50px' : '56px'
    },
    MyFormControlNotSelectedField: {
      border: '1px solid #CDD6E9',
      color: '#576A94',
      width: isMobile ? '160px' : '170px',
      height: isMobile ? '50px' : '56px',
      borderRadius: ''
    },
    radioWrap: {
      '&.MuiFormGroup-root': {
        flexWrap: 'nowrap'
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
      {question && (
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
      )}
      <RadioGroup id={`details-dual-input`} className={classes.radioWrap} row={true} value={value} onChange={setRadioChange}>
        <MyFormControlBox
          id="details-dual-input-option-1"
          style={{ marginLeft: '0px', marginRight: isMobile ? 0 : '23px' }}
          className={options[0].id === value ? classes.MyFormControlSelectedField : classes.MyFormControlNotSelectedField}
          value={options[0].id}
          control={<Radio id={options[0].id} color="primary" />}
          label={<Typography variant="h5">{options[0].value}</Typography>}
        />
        <MyFormControlBox
          id="details-dual-input-option-2"
          style={{ marginRight: 0, marginLeft: isMobile ? '14px' : 0 }}
          className={options[1].id === value ? classes.MyFormControlSelectedField : classes.MyFormControlNotSelectedField}
          value={options[1].id}
          control={<Radio id={options[1].id} color="primary" />}
          label={<Typography variant="h5">{options[1].value}</Typography>}
        />
      </RadioGroup>
    </React.Fragment>
  )
}

export default DetailsRadioButtons
