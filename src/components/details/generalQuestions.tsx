import React, { useEffect, useState } from 'react'
import { makeStyles, Grid, useTheme, Typography, styled, Button } from '@material-ui/core'
import { useMediaQuery } from 'react-responsive'
import DetailsRadioButtons from 'components/details/detailsRadioButtons'
import DetailsRadioButtonsTripple from 'components/details/detailsRadioButtonsTripple'
import { ITheme } from 'interfaces/shared/ITheme'
import { useDispatch, useSelector } from 'react-redux'
import { getDetailsData } from '../../constants'
import { setGeneralQuestions } from 'actions/detailsAction'
import { IDetails } from 'interfaces/details/IDetails'
import { useLocation, useNavigate } from 'react-router-dom'

const MyDetailsTitle = styled(Typography)({
  color: '#252A41',
  lineHeight: 1.5
})

const GeneralQuestions: React.FC = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 960px)' })
  const primaryTextColor = useTheme<ITheme>().text.primary
  const generalQuestions = useSelector((state) => state.detailsReducer.generalQuestions)
  const dispatch = useDispatch()
  const [disable, setDisable] = useState<boolean>(true)
  const location = useLocation()
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
    if (generalQuestions.length <= 0) {
      const { generalQuestions } = getDetailsData()
      dispatch(setGeneralQuestions(generalQuestions))
    }
  }, [])

  const validateAnswers = (questions: IDetails[]): boolean =>
    questions.every((question: IDetails) => {
      // eslint-disable-next-line no-prototype-builtins
      return question.hasOwnProperty('answer') && question.answer !== undefined
    })

  useEffect(() => {
    const res = validateAnswers(generalQuestions)
    if (res) setDisable(false)
    else setDisable(true)
  }, [generalQuestions])

  const updateAnswer = (question: IDetails, answer: string, questions: IDetails[]) => {
    const updatedQuestions: IDetails[] = questions.map((q) => (q.id === question.id ? { ...q, answer: answer } : q))
    dispatch(setGeneralQuestions(updatedQuestions))
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

  const navigateToStep = (step: string) =>
    navigate({
      pathname: location.pathname,
      search: `?step=${step}`
    })

  return (
    <>
      <MyDetailsTitle variant="h3">
        Almost there. We just need a few <strong>details about your project preferences & quality</strong>
      </MyDetailsTitle>
      {generalQuestions.map((question) => mapQuestions(question, generalQuestions))}
      <Grid item>
        <Button
          id="details-step-1"
          className={classes.button}
          disabled={disable}
          fullWidth
          color="primary"
          onClick={() => navigateToStep('2')}
          variant="contained">
          <Typography style={{ color: primaryTextColor }} variant="h5">
            Next
          </Typography>
        </Button>
      </Grid>
    </>
  )
}

export default GeneralQuestions
