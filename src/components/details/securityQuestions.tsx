import React, { useEffect, useState } from 'react'
import { makeStyles, Grid, useTheme, Typography, styled, Button } from '@material-ui/core'
import { useMediaQuery } from 'react-responsive'
import DetailsRadioButtons from 'components/details/detailsRadioButtons'
import DetailsRadioButtonsTripple from 'components/details/detailsRadioButtonsTripple'
import { ITheme } from 'interfaces/shared/ITheme'
import { useDispatch, useSelector } from 'react-redux'
import { getDetailsData } from '../../constants'
import { setSecurityQuestions } from 'actions/detailsAction'
import { IDetails } from 'interfaces/details/IDetails'
import { useNavigate } from 'react-router-dom'

const MyDetailsTitle = styled(Typography)({
  color: '#252A41',
  lineHeight: 1.5
})

const SecurityQuestions: React.FC = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 960px)' })
  const primaryTextColor = useTheme<ITheme>().text.primary
  const securityQuestions = useSelector((state) => state.detailsReducer.securityQuestions)
  const dispatch = useDispatch()
  const [disable, setDisable] = useState<boolean>(true)
  const navigate = useNavigate()

  const classes = makeStyles(() => {
    return {
      button: {
        ...(isMobile ? { marginTop: '4rem' } : { width: '240px', marginTop: '8rem' }),
        height: '55px',
        borderRadius: '8px'
      }
    }
  })()

  useEffect(() => {
    if (securityQuestions.length <= 0) {
      const { securityQuestions } = getDetailsData()
      dispatch(setSecurityQuestions(securityQuestions))
    }
  }, [])

  const validateAnswers = (questions: IDetails[]): boolean =>
    questions.every((question: IDetails) => {
      // eslint-disable-next-line no-prototype-builtins
      return question.hasOwnProperty('answer') && question.answer !== undefined
    })

  useEffect(() => {
    const res = validateAnswers(securityQuestions)
    if (res) setDisable(false)
    else setDisable(true)
  }, [securityQuestions])

  const updateAnswer = (question: IDetails, answer: string, questions: IDetails[]) => {
    const updatedQuestions: IDetails[] = questions.map((q) => (q.id === question.id ? { ...q, answer: answer } : q))
    dispatch(setSecurityQuestions(updatedQuestions))
  }

  const mapQuestions = (question: IDetails, questions: IDetails[]) => {
    switch (question.type) {
      case 'statement':
        switch (question.varinat) {
          case 'double':
            return (
              <DetailsRadioButtons
                question={question.title}
                handleRadioChange={(event) => updateAnswer(question, event.target.value, questions)}
                value={question.answer}
                options={question.options}
              />
            )
          case 'triple':
            return (
              <DetailsRadioButtonsTripple
                question={question.title}
                handleRadioChange={(event) => updateAnswer(question, event.target.value, questions)}
                value={question.answer}
                options={question.options}
              />
            )
          default:
            return null
        }
      default:
        return null
    }
  }

  return (
    <>
      <MyDetailsTitle variant="h3">
        <strong>Final step.</strong> We have a couple of quick questions to understand a little bit about your{' '}
        <strong>house construction project</strong>
      </MyDetailsTitle>
      {securityQuestions.map((question) => mapQuestions(question, securityQuestions))}
      <Grid item>
        <Button
          id="details-step-3"
          className={classes.button}
          disabled={disable}
          fullWidth
          color="primary"
          onClick={() => navigate('/quote')}
          variant="contained">
          <Typography style={{ color: primaryTextColor }} variant="h5">
            Get Quote
          </Typography>
        </Button>
      </Grid>
    </>
  )
}

export default SecurityQuestions
