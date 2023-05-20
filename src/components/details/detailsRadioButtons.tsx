/* eslint-disable no-unused-vars */
import React from 'react'
import { useMediaQuery } from 'react-responsive'
import { styled, makeStyles, Typography, RadioGroup, FormControlLabel, Radio, useTheme } from '@material-ui/core'

import { ITheme } from 'interfaces/shared/ITheme'

interface IDetailsRadioButtons {
  question: string
  handleRadioChange(event): void
  value: string
}

const MyOperateQuestion = styled(Typography)({
  fontWeight: 500,
  color: '#252A41',
  marginTop: '30px'
})
const MyFormControlBox = styled(FormControlLabel)({
  height: '50px',
  borderRadius: '10px',
  marginTop: '15px',
  padding: '0px 0px 0px 1rem'
})

const DetailsRadioButtons: React.FC<IDetailsRadioButtons> = (props: IDetailsRadioButtons) => {
  const { question, handleRadioChange, value } = props
  const isMobile = useMediaQuery({ query: '(max-width: 960px)' })

  const primaryColor = useTheme<ITheme>().palette.primary.main

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
    MyFormControlLabel: {
      border: value === 'yes' ? `1px solid ${primaryColor}` : '1px solid #CDD6E9',
      color: value === 'yes' ? '#576A94' : '#576A94',
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
    MyFormControl: {
      border: value === 'no' ? `1px solid ${primaryColor}` : '1px solid #CDD6E9',
      color: value === 'no' ? '#576A94' : '#576A94',
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

  return (
    <React.Fragment>
      {question && <MyOperateQuestion variant="h5">{question}</MyOperateQuestion>}
      <RadioGroup
        id={`details-radiobutton`}
        className={classes.radioWrap}
        row={true}
        name="policy"
        value={value}
        onChange={setRadioChange}>
        <MyFormControlBox
          id="details-yes"
          style={{ marginLeft: '0px', marginRight: isMobile ? 0 : '23px' }}
          className={classes.MyFormControlLabel}
          value="yes"
          control={<Radio id={`yes`} color="primary" />}
          label={<Typography variant="h5">Yes</Typography>}
        />
        <MyFormControlBox
          id="details-no"
          style={{ marginRight: 0, marginLeft: isMobile ? '14px' : 0 }}
          className={classes.MyFormControl}
          value="no"
          control={<Radio id={`no`} color="primary" />}
          label={<Typography variant="h5">No</Typography>}
        />
      </RadioGroup>
    </React.Fragment>
  )
}

export default DetailsRadioButtons
