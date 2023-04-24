import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Box,
  makeStyles,
  Typography,
  TextField,
  Button,
  useTheme,
  RadioGroup,
  Radio,
  styled,
  FormControlLabel
} from '@material-ui/core'
import { useMediaQuery } from 'react-responsive'
import { ITheme } from 'interfaces/shared/ITheme'
import { inputShadowStyle } from '../../utilities'
import WhiteLoader from '../../images/whiteLoader.png'
import BlackLogo from '../../images/logo-black.png'
import { verifyEmail } from '../../utilities'
import { USERS_ENDPOINT } from '../../constants'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from '../../actions/userAction'

const MyFormControlBox = styled(FormControlLabel)({
  marginLeft: 0,
  borderRadius: '10px',
  marginTop: '15px',
  padding: '0px 0px 0px 1rem'
})

const MyRadio = styled(Radio)({
  color: '#576A94'
})

const SignUp: React.FC = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 960px)' })
  const primaryColor = useTheme<ITheme>().palette.primary.main
  const [nameError, setNameError] = useState<boolean>(false)
  const [emailError, setEmailError] = useState<boolean>(false)
  const [passwordError, setPasswordError] = useState<boolean>(false)
  const [typeError, setTypeError] = useState<boolean>(false)
  const [errorMsg, setErrorMsg] = useState<string>('')
  const [request, setRequest] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [type, setType] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => setEmailError(false), [email])
  useEffect(() => setPasswordError(false), [password])
  useEffect(() => setNameError(false), [name])
  useEffect(() => setTypeError(false), [type])

  const classes = makeStyles({
    pageBox: {
      display: isMobile ? 'grid' : 'flex',
      minHeight: '100vh'
    },
    myNameField: {
      marginTop: isMobile ? '2.5rem' : '3.75rem',
      '& .MuiOutlinedInput-root': {
        borderRadius: '10px',
        padding: '2px',
        fontWeight: 500
      },
      '& .MuiInputLabel-root': {
        color: nameError ? '#FF515D !important' : primaryColor
      },
      '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: nameError ? '#FF515D !important' : primaryColor
      },
      '& .MuiOutlinedInput-root:focus-within .MuiOutlinedInput-notchedOutline': {
        borderColor: nameError ? '#FF515D !important' : primaryColor
      },
      '& .MuiOutlinedInput-notchedOutline': { borderColor: nameError ? '#FF515D' : '#CDD6E9' }
    },
    myTextField: {
      marginTop: isMobile ? '2.5rem' : '3.75rem',
      '& .MuiOutlinedInput-root': {
        borderRadius: '10px',
        padding: '2px',
        fontWeight: 500
      },
      '& .MuiInputLabel-root': {
        color: emailError ? '#FF515D !important' : primaryColor
      },
      '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: emailError ? '#FF515D !important' : primaryColor
      },
      '& .MuiOutlinedInput-root:focus-within .MuiOutlinedInput-notchedOutline': {
        borderColor: emailError ? '#FF515D !important' : primaryColor
      },
      '& .MuiOutlinedInput-notchedOutline': { borderColor: emailError ? '#FF515D' : '#CDD6E9' }
    },
    myPasswordField: {
      marginTop: isMobile ? '2.5rem' : '3.75rem',
      '& .MuiOutlinedInput-root': {
        borderRadius: '10px',
        padding: '2px',
        fontWeight: 500
      },
      '& .MuiInputLabel-root': {
        color: passwordError ? '#FF515D !important' : primaryColor
      },
      '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: passwordError ? '#FF515D !important' : primaryColor
      },
      '& .MuiOutlinedInput-root:focus-within .MuiOutlinedInput-notchedOutline': {
        borderColor: passwordError ? '#FF515D !important' : primaryColor
      },
      '& .MuiOutlinedInput-notchedOutline': { borderColor: passwordError ? '#FF515D' : '#CDD6E9' }
    },
    quotation: {
      marginTop: '30px',
      marginBottom: '20px',
      padding: '1rem',
      display: 'flex',
      justifyContent: 'center',
      borderRadius: '8px'
    },
    leftBox: {
      padding: isMobile ? '22px 0px 0px 20px' : '30px 0px 0px 0px',
      background: '#FFFFFF'
    },
    content: {
      padding: isMobile ? '63px 20px 30px 0px' : '75px 0px',
      background: '#FFFFFF',
      textAlign: 'center'
    },
    rightBox: {
      background: '#E3FCFF',
      width: isMobile ? '' : '700px'
    },
    imageBox: {
      position: 'relative',
      paddingLeft: '64px !important',
      paddingRight: '64px !important',
      maxHeight: '700px',
      marginTop: '250px'
    },
    radioWrap: {
      marginTop: '15px',
      '&.MuiFormGroup-root': {
        flexWrap: 'nowrap'
      }
    },
    myFormControlLabelSelected: {
      border: `1px solid ${primaryColor}`,
      color: '#000000',
      marginRight: isMobile ? '0.938rem' : '1.8rem',

      width: isMobile ? '160px' : '170px',
      height: isMobile ? '45px' : '55px'
    },
    myFormControlLabelNotSelected: {
      border: '1px solid #CDD6E9',

      color: ' #576A94',
      marginRight: isMobile ? '0.938rem' : '1.8rem',
      width: isMobile ? '160px' : '170px',
      height: isMobile ? '50px' : '60px'
    }
  })()

  const makeApiCall = async () => {
    setTimeout(async () => {
      try {
        const res = await axios.post(`${USERS_ENDPOINT}/signup`, {
          name: name,
          email: email,
          password: password,
          type: type
        })
        dispatch(
          setUser({
            id: res.data.data.id,
            email: res.data.data.email,
            name: res.data.data.name,
            type: res.data.data.type
          })
        )
        setRequest(false)
        navigate('/dashboard')
      } catch (error) {
        if (error.response.status === 400) {
          setEmailError(true)
          setErrorMsg('An account with this email already exist.')
          setRequest(false)
          return
        } else {
          setNameError(true)
          setEmailError(true)
          setPasswordError(true)
          setTypeError(true)
          setErrorMsg('Something went wrong. Please try again')
          setRequest(false)
          return
        }
      }
    }, 2000)
  }

  const handleContinue = () => {
    if (!name && !email && !password && !type) {
      setNameError(true)
      setEmailError(true)
      setPasswordError(true)
      setTypeError(true)
      setErrorMsg('Please fill all the fields')
      setRequest(false)
      return
    } else if (!name) {
      setNameError(true)
      setErrorMsg('Please provide us with your name')
      setRequest(false)
      return
    }
    if (!email) {
      setEmailError(true)
      setErrorMsg('Please enter the email address')
      setRequest(false)
      return
    } else if (!password) {
      setPasswordError(true)
      setErrorMsg('Please enter the password')
      setRequest(false)
      return
    } else if (!type) {
      setTypeError(true)
      setErrorMsg('Please select account type')
      setRequest(false)
      return
    } else {
      const check: boolean = verifyEmail(email)
      if (check) makeApiCall()
      else {
        setEmailError(true)
        setErrorMsg('Please enter a valid email address')
        setRequest(false)
        return
      }
    }
  }

  return (
    <Box className={classes.pageBox}>
      <Box sx={{ width: '100%' }} className={classes.leftBox}>
        <img
          style={{
            width: isMobile ? '35px' : '45px',
            height: isMobile ? '35px' : '45px',
            marginLeft: isMobile ? '20px' : '100px'
          }}
          src="/images/logo.png"
        />
        <Box className={classes.content}>
          <Box
            style={{
              maxWidth: isMobile ? '100%' : '490px',
              margin: isMobile ? '' : '0px auto',
              padding: isMobile ? '' : '0px 20px'
            }}>
            <Typography variant="subtitle1" style={{ fontWeight: 800 }}>
              Sign-Up
            </Typography>
            <Typography
              variant="h5"
              style={{
                textAlign: isMobile ? 'left' : 'center',
                lineHeight: 2
              }}>
              Ready to take the first step? Sign up now and let&apos;s get started!
            </Typography>
            {(emailError || passwordError || nameError || typeError) && (
              <Box style={{ backgroundColor: '#FFF0F1', alignItems: 'center' }} className={classes.quotation}>
                <Typography variant="h6" style={{ color: '#FF515D' }}>
                  {errorMsg}
                </Typography>
              </Box>
            )}
            <TextField
              className={classes.myNameField}
              fullWidth
              style={{ marginTop: '30px' }}
              value={name}
              label="Full Name"
              onChange={(event: React.ChangeEvent<{ value: string }>) => setName(event.target.value)}
              inputProps={{ style: inputShadowStyle }}
              variant="outlined"
            />
            <TextField
              className={classes.myTextField}
              fullWidth
              style={{ marginTop: '30px' }}
              value={email}
              label="Email Address"
              onChange={(event: React.ChangeEvent<{ value: string }>) => setEmail(event.target.value)}
              inputProps={{ style: inputShadowStyle }}
              variant="outlined"
            />
            <TextField
              className={classes.myPasswordField}
              fullWidth
              style={{ marginTop: '30px' }}
              value={password}
              type="password"
              label="Password"
              onChange={(event: React.ChangeEvent<{ value: string }>) => setPassword(event.target.value)}
              inputProps={{ style: inputShadowStyle }}
              variant="outlined"
            />
            <RadioGroup
              id="account-type"
              row={true}
              className={classes.radioWrap}
              aria-label="position"
              name="position"
              value={type}
              onChange={(event: React.ChangeEvent<{ value: string }>) => setType(event.target.value)}>
              <MyFormControlBox
                className={type === 'user' ? classes.myFormControlLabelSelected : classes.myFormControlLabelNotSelected}
                style={{
                  width: isMobile ? '160px' : '170px',
                  height: isMobile ? '50px' : '60px'
                }}
                value="user"
                id="user"
                control={<MyRadio color="primary" />}
                label={<Typography variant="h5">User</Typography>}
              />
              <MyFormControlBox
                id="builder"
                style={{
                  width: isMobile ? '160px' : '170px',
                  height: isMobile ? '50px' : '60px'
                }}
                className={type === 'builder' ? classes.myFormControlLabelSelected : classes.myFormControlLabelNotSelected}
                value="builder"
                control={<MyRadio color="primary" />}
                label={<Typography variant="h5">Builder</Typography>}
              />
            </RadioGroup>
            <Button
              onClick={() => {
                setRequest(true)
                handleContinue()
              }}
              style={{ marginTop: isMobile ? '22px' : '30px', height: '50px', borderRadius: '10px', textTransform: 'none' }}
              color="primary"
              fullWidth
              disabled={request}
              variant="contained">
              <Typography variant="h5">Continue {request && <img width="50px" height="50px" src={WhiteLoader} />}</Typography>
            </Button>
          </Box>
        </Box>
      </Box>
      {!isMobile && (
        <Box sx={{ flexShrink: 0 }} className={classes.rightBox}>
          <Box className={classes.imageBox}>
            <img src={BlackLogo} width={'100%'} height={'50%'} />
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default SignUp
