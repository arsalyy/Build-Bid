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
  color: '#252A41'
})
const MyFormControlBox = styled(FormControlLabel)({
  height: '50px',
  borderRadius: '10px',
  marginTop: '4px'
})

const DetailsRadioButtonsTripple: React.FC<IDetailsRadioButtons> = (props: IDetailsRadioButtons) => {
  const { question, handleRadioChange, value } = props
  const isMobile = useMediaQuery({ query: '(max-width: 960px)' })
  const primaryColor = useTheme<ITheme>().palette.primary.main

  const classes = makeStyles({
    MyFormControlLabel: {
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
    MyFormControl: {
      color: value === 'two' ? '#252A41' : '#576A94',
      width: isMobile ? '33%' : '170px',
      height: isMobile ? '50px' : '56px',
      marginLeft: '',
      marginRight: isMobile ? 0 : '23px',
      border: 'none',
      '& .MuiFormControlLabel-label ': {
        marginLeft: '6px'
      }
    },
    MyFormControlThirdBox: {
      border: 'none',
      color: value === 'three' ? '#252A41' : '#576A94',
      width: isMobile ? '33%' : '170px',
      height: isMobile ? '50px' : '56px',
      marginRight: 0,
      marginLeft: '',
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

  return (
    <React.Fragment>
      <MyOperateQuestion variant="h5" style={{ marginTop: isMobile ? '30px' : '40px' }}>
        {question}
      </MyOperateQuestion>
      <RadioGroup
        id={`details-radiobutton`}
        className={classes.radioWrap}
        row={true}
        name="policy"
        value={value}
        onChange={setRadioChange}>
        <MyFormControlBox
          id="details-one"
          className={classes.MyFormControlLabel}
          value={'one'}
          control={<Radio id={`one`} color="primary" />}
          label={<Typography variant="h5">Own</Typography>}
        />
        <MyFormControlBox
          id="details-two"
          className={classes.MyFormControl}
          value={'two'}
          control={<Radio id={`two`} color="primary" />}
          label={<Typography variant="h5">Lease</Typography>}
        />
        <MyFormControlBox
          id="details-three"
          className={classes.MyFormControlThirdBox}
          value={'three'}
          control={<Radio id={`three`} color="primary" />}
          label={<Typography variant="h5">Finance</Typography>}
        />
      </RadioGroup>
    </React.Fragment>
  )
}

export default DetailsRadioButtonsTripple
