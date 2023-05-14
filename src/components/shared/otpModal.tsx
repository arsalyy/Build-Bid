import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Box, makeStyles, useTheme, Typography } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import { ITheme } from 'interfaces/shared/ITheme'
import SmallLogo from '../../images/logo-small-black.png'
import BlackLogo from '../../images/logo-black-label.png'
import OtpInput from 'react-otp-input'
import Loader from '../../images/loader.png'
import Checked from '../../images/checked.svg'
import { USERS_ENDPOINT } from '../../constants'
import { useNavigate } from 'react-router-dom'
import { setVerified } from '../../actions/userAction'

const OTPModal: React.FC = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 960px)' })
  const primaryColor = useTheme<ITheme>().palette.primary.main
  const secondaryColor = useTheme<ITheme>().palette.secondary.main
  const email = useSelector((state) => state.userReducer.email)
  const [otp, setOtp] = useState('')
  const [otpError, setOtpError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [otpSuccess, setOtpSuccess] = useState<boolean>(false)
  const [otpSent, setOtpSent] = useState<boolean>(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const type = useSelector((state) => state.userReducer.type)

  const sendOTP = async () => {
    try {
      const res = await axios.post(`${USERS_ENDPOINT}/sendOTP`, {
        email: email
      })
      console.log(res)
    } catch (error) {
      console.error(error)
    }
  }

  const resendOTP = () => {
    setOtpError(false)
    sendOTP()
    setOtpSent(true)
    setTimeout(() => {
      setOtpSent(false)
    }, 3000)
  }

  useEffect(() => {
    sendOTP()
  }, [])

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
    setLoading(false)
    setOtpSuccess(true)
    dispatch(setVerified(true))
    type !== 'builder' && setTimeout(() => navigate('/dashboard'), 2500)
  }

  const otpVerification = async (value) => {
    setLoading(true)
    setTimeout(async () => {
      try {
        const res = await axios.post(`${USERS_ENDPOINT}/verifyOTP`, {
          otp: value
        })
        if (res.status === 200) redirectFunction()
      } catch (error) {
        console.error(error)
        setLoading(false)
        setOtpError(true)
      }
    }, 2500)
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
          <Typography style={{ fontSize: '20px', fontWeight: '800', textAlign: isMobile ? 'center' : 'start' }}>
            Almost There
          </Typography>
          <Typography style={{ fontSize: '20px', fontWeight: '800', textAlign: isMobile ? 'center' : 'start' }}>
            Verify your email address
          </Typography>
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
            {otpSuccess && (
              <Box>
                <img src={Checked} width={isMobile ? '25px' : '50px'} height={isMobile ? '25px' : '50px'} />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default OTPModal
