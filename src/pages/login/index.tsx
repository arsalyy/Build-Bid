import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Box, makeStyles, Typography, styled, TextField, Button, useTheme } from '@material-ui/core'
import { useMediaQuery } from 'react-responsive'
import { ITheme } from 'interfaces/shared/ITheme'
import { inputShadowStyle } from '../../utilities'
import WhiteLoader from '../../images/whiteLoader.png'
import BlackLogo from '../../images/logo-black.png'
import { verifyEmail } from '../../utilities'
import { USERS_ENDPOINT } from '../../constants'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../actions/userAction'
import { Link, useNavigate } from 'react-router-dom'
import OTPModal from '../../components/shared/otpModal'

const Login: React.FC = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 960px)' })
  const primaryColor = useTheme<ITheme>().palette.primary.main
  const [emailError, setEmailError] = useState<boolean>(false)
  const [passwordError, setPasswordError] = useState<boolean>(false)
  const [errorMsg, setErrorMsg] = useState<string>('')
  const [request, setRequest] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [showModal, setShowModal] = useState<boolean>(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const loggedIn = useSelector((state) => state.userReducer.verified)

  useEffect(() => {
    if (loggedIn) navigate('/dashboard')
  }, [loggedIn])
  useEffect(() => setEmailError(false), [email])
  useEffect(() => setPasswordError(false), [password])

  const MyLink = styled(Link)({
    cursor: 'pointer',
    color: primaryColor,
    '&:hover': {
      color: primaryColor
    }
  })

  const classes = makeStyles({
    pageBox: {
      display: isMobile ? 'grid' : 'flex',
      minHeight: '100vh'
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
      padding: isMobile ? '63px 20px 30px 0px' : '75px',
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
      marginTop: '200px'
    }
  })()

  const makeApiCall = async () => {
    setTimeout(async () => {
      try {
        const res = await axios.post(`${USERS_ENDPOINT}/login`, {
          email: email,
          password: password
        })
        dispatch(
          setUser({
            id: res.data.data.id,
            email: res.data.data.email,
            name: res.data.data.name,
            type: res.data.data.type,
            verified: false,
            identityVerified: res.data.data.identityVerified,
            waiting: res.data.data.waiting
          })
        )
        setRequest(false)
        setShowModal(true)
      } catch (error) {
        if (error.response.status === 404) {
          setEmailError(true)
          setErrorMsg('An account with this email does not exist. Try signing up first.')
          setRequest(false)
          return
        } else if (error.response.status === 401) {
          setPasswordError(true)
          setErrorMsg('Your password is incorrect.')
          setRequest(false)
          return
        } else {
          setEmailError(true)
          setPasswordError(true)
          setErrorMsg('Something went wrong. Please try again')
          setRequest(false)
          return
        }
      }
    }, 2000)
  }

  const handleContinue = () => {
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
      {showModal && <OTPModal />}
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
              Log-In
            </Typography>
            <Typography
              variant="h5"
              style={{
                textAlign: isMobile ? 'left' : 'center',
                lineHeight: 2
              }}>
              Welcome back! Let&apos;s pick up where you left off.
            </Typography>
            <Typography
              variant="h5"
              style={{
                textAlign: isMobile ? 'left' : 'center',
                lineHeight: 2
              }}>
              Didn&apos;t have an account? Try <MyLink to="/signup">signing-up</MyLink> first.
            </Typography>
            {(emailError || passwordError) && (
              <Box style={{ backgroundColor: '#FFF0F1', alignItems: 'center' }} className={classes.quotation}>
                <Typography variant="h6" style={{ color: '#FF515D' }}>
                  {errorMsg}
                </Typography>
              </Box>
            )}
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

export default Login
