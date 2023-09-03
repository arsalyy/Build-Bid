import React, { useState } from 'react'
import { Button, styled, TextField, Typography, Box, useTheme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { ITheme } from 'interfaces/shared/ITheme'
import { useDispatch } from 'react-redux'
import { setLoggedIn } from 'actions/adminAction'
import axios from 'axios'
import { ADMIN_ENDPOINT } from '../../constants'

const PasswordTitle = styled(Typography)({
  fontWeight: 500,
  color: '#576A94',
  marginTop: 15,
  lineHeight: 1.5
})

const AuthTitle = styled(Typography)({
  color: '#252A41',
  fontWeight: 600,
  marginTop: '40px',
  lineHeight: 1.75
})

const PageBox = styled(Box)({
  background: '#FFFFFF',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: '2rem'
})

const AdminLogin: React.FC = () => {
  const [password, setPassword] = useState('')
  const [passwordCheck, setPasswordCheck] = useState(true)
  const primaryColor = useTheme<ITheme>().palette.primary.main
  const dispatch = useDispatch()

  const useStyles = makeStyles({
    textField: {
      '& .MuiOutlinedInput-root': {
        borderRadius: '8px',
        padding: '2px',
        fontWeight: 500
      },
      '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: primaryColor
      }
    }
  })
  const classes = useStyles()

  const handleInputChange = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password) {
      setPasswordCheck(true)
      try {
        const res = await axios.post(`${ADMIN_ENDPOINT}/login`, {
          password: password
        })
        if (res.status === 200) dispatch(setLoggedIn(true))
      } catch (error) {
        console.error(error)
        setPasswordCheck(false)
      }
    } else {
      setPasswordCheck(false)
    }
  }

  return (
    <PageBox>
      <AuthTitle variant="h1">Authentication</AuthTitle>
      <form
        style={{
          marginLeft: '250px',
          marginRight: '250px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'centre'
        }}
        onSubmit={handleSubmit}>
        <Box className="form-group" display="flex" flexDirection="column" alignItems="center">
          <PasswordTitle variant="h3">Password</PasswordTitle>
          <TextField
            id="login-password-field"
            className={`${classes.textField}`}
            style={{ marginTop: '1rem' }}
            variant="outlined"
            fullWidth
            type="password"
            name="password"
            onChange={(e) => handleInputChange(e)}
          />
          {!passwordCheck && (
            <Typography variant="h5" style={{ marginTop: '30px', color: '#FF515D' }}>
              Wrong Password
            </Typography>
          )}
        </Box>
        <Button
          id="login-button"
          style={{ marginTop: '2.6rem', height: '55px', borderRadius: '8px', textTransform: 'none' }}
          color="primary"
          fullWidth
          variant="contained"
          onClick={handleSubmit}>
          <Typography
            variant="h5"
            style={{
              fontWeight: 500
            }}>
            SUBMIT
          </Typography>
        </Button>
      </form>
    </PageBox>
  )
}

export default AdminLogin
