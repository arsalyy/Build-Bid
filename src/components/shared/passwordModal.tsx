import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Box, makeStyles, useTheme, Typography, TextField, Button } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import { ITheme } from 'interfaces/shared/ITheme'
import SmallLogo from '../../images/logo-small-black.png'
import BlackLogo from '../../images/logo-black-label.png'
import OtpInput from 'react-otp-input'
import Loader from '../../images/loader.png'
import WhiteLoader from '../../images/whiteLoader.png'
import { USERS_ENDPOINT } from '../../constants'
import { inputShadowStyle } from '../../utilities'

const PasswordModal: React.FC = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 960px)' })
  const primaryColor = useTheme<ITheme>().palette.primary.main
  const secondaryColor = useTheme<ITheme>().palette.secondary.main
  const [otp, setOtp] = useState('')
  const [otpError, setOtpError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [emailError, setEmailError] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [password2, setPassword2] = useState<string>('')
  const [passwordError, setPasswordError] = useState<boolean>(false)
  const [request, setRequest] = useState<boolean>(false)
  const [otpSent, setOtpSent] = useState<boolean>(false)
  const [showOtp, setShowOtp] = useState<boolean>(false)
  const userId = useSelector((state) => state.userReducer.id)
  const [flow, setFlow] = useState<number>(1)

  useEffect(() => setEmailError(false), [email])

  const sendOTP = async () => {
    setRequest(true)
    try {
      const res = await axios.post(`${USERS_ENDPOINT}/sendOTP`, {
        email: email
      })
      if (res.status === 200) setShowOtp(true)
    } catch (error) {
      console.error(error)
    }
    setRequest(false)
  }

  const classes = makeStyles({
    outerBox: {
      position: 'fixed',
      zIndex: 99999,
      paddingTop: '100px',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      overflow: 'auto',
      backdropFilter: 'blur(25px)'
    },
    mainBox: {
      display: isMobile ? 'grid' : 'flex',
      position: 'absolute',
      left: '50%',
      top: '50%',
      zIndex: 999999,
      backgroundColor: '#fff',
      transform: 'translate(-50%, -50%)',
      width: isMobile ? '335px' : '700px',
      borderRadius: '6px'
    },
    leftBox: {
      padding: '20px',
      backgroundColor: secondaryColor,
      maxWidth: isMobile ? '335px' : '320px',
      display: 'flex',
      flexDirection: isMobile ? 'row' : 'column',
      justifyContent: 'space-between',
      borderRadius: '6px 0px 0px 6px',
      minHeight: isMobile ? '150px' : '500px'
    },
    rightBox: {
      padding: isMobile ? '30px 20px' : '40px'
    },
    centerImage: {
      display: 'flex',
      justifyContent: 'center',
      margin: isMobile ? '1px 0px' : '',
      flexDirection: isMobile ? 'column' : 'row'
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
    }
  })()

  const onOtpChange = (value) => {
    setOtp(value)
    setOtpError(false)
    if (value.length === 4) {
      otpVerification(value)
    }
  }

  const redirectFunction = () => {
    location.reload()
  }

  const otpVerification = async (value) => {
    setLoading(true)
    setTimeout(async () => {
      try {
        const res = await axios.post(`${USERS_ENDPOINT}/verifyOTP`, {
          otp: value,
          userId: userId
        })
        if (res.status === 200) setFlow(2)
      } catch (error) {
        console.error(error)
        setLoading(false)
        setOtpError(true)
      }
    }, 2500)
  }

  const resendOTP = () => {
    setOtpError(false)
    sendOTP()
    setOtpSent(true)
    setTimeout(() => {
      setOtpSent(false)
    }, 3000)
  }

  useEffect(() => setPasswordError(false), [password, password2])

  const handlePassword = async () => {
    if (password !== password2) setPasswordError(true)

    if (password === password2) {
      try {
        const res = await axios.post(`${USERS_ENDPOINT}/resetPassword`, {
          email: email,
          password: password
        })
        if (res.status === 200) redirectFunction()
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <Box className={classes.outerBox}>
      <Box className={classes.mainBox}>
        <Box className={classes.leftBox}>
          <Box>
            <img src={SmallLogo} width={isMobile ? '30px' : '50px'} height={isMobile ? '29.11px' : '48.52px'} />
          </Box>
          <Box className={classes.centerImage}>
            <img src={BlackLogo} width={isMobile ? '135px' : '280px'} height={isMobile ? '25px' : '50px'} />
          </Box>
          <Box style={{ display: 'flex', justifyContent: 'end', flexDirection: isMobile ? 'column' : 'row' }}>
            <img src={SmallLogo} width={isMobile ? '30px' : '50px'} height={isMobile ? '29.11px' : '48.52px'} />
          </Box>
        </Box>
        <Box className={classes.rightBox}>
          {flow === 1 && (
            <>
              <Typography style={{ fontSize: '20px', fontWeight: '800', textAlign: isMobile ? 'center' : 'start' }}>
                Verify your email address
              </Typography>
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
              <Button
                onClick={sendOTP}
                style={{ marginTop: isMobile ? '22px' : '30px', height: '50px', borderRadius: '10px', textTransform: 'none' }}
                color="primary"
                fullWidth
                disabled={request}
                variant="contained">
                <Typography variant="h5">Continue {request && <img width="50px" height="50px" src={WhiteLoader} />}</Typography>
              </Button>

              {showOtp && (
                <>
                  <Typography
                    style={{
                      fontSize: '13px',
                      fontWeight: '500',
                      textAlign: isMobile ? 'center' : 'start',
                      color: '#545464',
                      marginTop: '20px'
                    }}>
                    We&apos;ve emailed you a four-digit code to <strong>{email}</strong>
                  </Typography>
                  {otpError && (
                    <Typography
                      style={{
                        fontSize: '13px',
                        fontWeight: '500',
                        textAlign: 'center',
                        color: '#ff515d',
                        marginTop: '20px'
                      }}>
                      Invalid Code. Please Try Again. <br />{' '}
                      <strong style={{ cursor: 'pointer' }} onClick={() => resendOTP()}>
                        Click here to Resend OTP
                      </strong>
                    </Typography>
                  )}
                  {otpSent && (
                    <Typography
                      style={{
                        fontSize: '13px',
                        fontWeight: '500',
                        textAlign: 'center',
                        color: primaryColor,
                        marginTop: '20px'
                      }}>
                      OTP sent Again!
                    </Typography>
                  )}
                  <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}>
                    <OtpInput
                      value={otp}
                      containerStyle={{ justifyContent: 'center' }}
                      onChange={(value) => {
                        onOtpChange(value)
                      }}
                      inputStyle={{
                        outline: 'none',
                        width: isMobile ? '45px' : '50px',
                        height: isMobile ? '60px' : '65px',
                        margin: otpError
                          ? isMobile
                            ? '0.938rem 0.625rem'
                            : '1.25rem 0.781rem'
                          : isMobile
                          ? '1.875rem 0.625rem'
                          : '2.5rem 0.781rem',
                        fontSize: '1.125rem',
                        fontFamily: 'Montserrat',
                        borderRadius: 10,
                        border: `1px solid #CDD6E9`
                      }}
                      focusStyle={{
                        border: `1px solid ${primaryColor}`
                      }}
                    />
                  </Box>
                  <Box style={{ display: 'flex', justifyContent: 'center' }}>
                    {loading && <img src={Loader} width="50px" height="50px" />}
                  </Box>
                </>
              )}
            </>
          )}
          {flow === 2 && (
            <>
              <Typography style={{ fontSize: '20px', fontWeight: '800', textAlign: isMobile ? 'center' : 'start' }}>
                Reset Your Password
              </Typography>
              <TextField
                className={classes.myPasswordField}
                fullWidth
                style={{ marginTop: '30px' }}
                value={password}
                type="password"
                label="New Password"
                onChange={(event: React.ChangeEvent<{ value: string }>) => setPassword(event.target.value)}
                inputProps={{ style: inputShadowStyle }}
                variant="outlined"
              />
              <TextField
                className={classes.myPasswordField}
                fullWidth
                style={{ marginTop: '30px' }}
                value={password2}
                type="password"
                label="Re-enter New Password"
                onChange={(event: React.ChangeEvent<{ value: string }>) => setPassword2(event.target.value)}
                inputProps={{ style: inputShadowStyle }}
                variant="outlined"
              />
              <Button
                onClick={handlePassword}
                style={{ marginTop: isMobile ? '22px' : '30px', height: '50px', borderRadius: '10px', textTransform: 'none' }}
                color="primary"
                fullWidth
                variant="contained">
                <Typography variant="h5">Continue</Typography>
              </Button>
            </>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default PasswordModal
