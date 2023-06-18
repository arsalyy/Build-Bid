import React, { useState, useEffect } from 'react'
import {
  Typography,
  styled,
  TextField,
  InputAdornment,
  Box,
  Button,
  IconButton,
  makeStyles,
  Divider,
  Grid,
  useTheme
} from '@material-ui/core'
import { useMediaQuery } from 'react-responsive'
import { useDispatch, useSelector } from 'react-redux'
import { setArea } from 'actions/startAction'
import CancelIcon from '@material-ui/icons/Cancel'
import Search from '../../images/search.png'
import { ITheme } from 'interfaces/shared/ITheme'
import Header from 'components/shared/header'
import { useNavigate } from 'react-router-dom'

const MySearchTitle = styled(Typography)({
  fontStyle: 'normal',
  fontWeight: 800
})

const First = styled(Typography)({
  fontStyle: 'normal',
  fontWeight: 'normal'
})

const MySearchField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: '10px',
    paddingRight: '8px ',
    borderColor: '#CDD6E9'
  }
})

const Start: React.FC = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 960px)' })
  const area = useSelector((state) => state.startReducer.area)
  const dispatch = useDispatch()
  const primaryTextColor = useTheme<ITheme>().text.primary
  const [disable, setDisable] = useState<boolean>(true)
  const navigate = useNavigate()

  const classes = makeStyles(() => {
    return {
      pageBox: { background: '#FFFFFF', minHeight: '100vh' },
      headerBox: { padding: isMobile ? '0.4rem 1.25rem 0.6rem' : '0.6rem 5.75rem 0.5rem 6.3rem' },
      contentBox: { padding: isMobile ? '2.2rem 1.15rem 1.15rem 1.25rem' : '3.7rem 6.9rem 6rem 6.3rem' },
      descriptionBox: {
        marginTop: '15px',
        backgroundColor: '#FBFBFB',
        borderRadius: '0px 15px 15px',
        padding: '15px',
        color: '#545464',
        fontWeight: 500
      },
      search: {
        borderRadius: '10px',
        '& .MuiFormControl-root': {
          '& .MuiInputBase-root': { paddingRight: '10px!important' }
        },
        '& input[type=number]': {
          '-moz-appearance': 'textfield'
        },
        '& input[type=number]::-webkit-outer-spin-button': {
          '-webkit-appearance': 'none',
          margin: 0
        },
        '& input[type=number]::-webkit-inner-spin-button': {
          '-webkit-appearance': 'none',
          margin: 0
        }
      },
      input: {
        borderRadius: '10px',
        fontSize: isMobile ? '0.813rem' : '1rem',
        color: '#252A41',
        marginLeft: isMobile ? '0' : '1.2rem',
        marginBottom: '5px',
        fontWeight: 500,
        '&::placeholder': {
          color: '#7988A9',
          fontSize: isMobile ? '0.84rem' : '1rem',
          fontWeight: 400
        },
        '$ .MuiOutlinedInput-root': {
          borderRadius: '10px'
        }
      },
      searchIcon: {
        margin: isMobile ? '0 0.4rem' : '0 0.2rem',
        width: isMobile ? '20px' : '24px',
        height: isMobile ? '20px' : '24px',
        marginBottom: '5px'
      },
      MyButton: {
        borderRadius: '8px',
        padding: '0.8rem 14px',
        width: isMobile ? '100%' : '240px',
        height: '55px'
      },
      FooterBox: {
        boxShadow: '0px -4px 20px rgba(177, 176, 176, 0.18)',
        padding: '20px',
        left: '0',
        position: 'fixed',
        bottom: '0px',
        display: 'flex',
        backgroundColor: '#FFFFFF',
        width: '100%',
        alignItems: 'center'
      }
    }
  })()

  useEffect(() => {
    if (area && area !== '') setDisable(false)
    else setDisable(true)
  }, [area])

  const nextButton = () => {
    return (
      <div style={{ display: 'flex', width: '100%', marginTop: isMobile ? '' : '10.875rem' }}>
        <Button
          id="start-button"
          className={classes.MyButton}
          disabled={disable}
          variant="contained"
          color="primary"
          onClick={() => navigate('/details?step=1')}>
          <Typography variant="h5" style={{ color: primaryTextColor, fontWeight: 500, textTransform: 'none' }}>
            NEXT
          </Typography>
        </Button>
      </div>
    )
  }

  const getSearchView = () => {
    return (
      <React.Fragment>
        <Box display="flex" style={{ flexWrap: 'wrap' }} mb={isMobile ? '0.2rem' : '0.6rem'}>
          <First variant="h3">First of all,</First>
          <MySearchTitle variant="h3">&nbsp;what is your total area?</MySearchTitle>
        </Box>
        <Typography variant="body1" style={{ color: '#576A94' }}>
          NOTE: We accept area in &nbsp;
          <span style={{ color: '#252A41', textDecoration: 'underline', fontWeight: '500' }}>square meters (&#13217;)</span>
        </Typography>
        <Typography variant="body1" style={{ color: '#576A94', marginBottom: '15px' }}>
          NOTE: Minimum Area is &nbsp;
          <span style={{ color: '#252A41', textDecoration: 'underline', fontWeight: '500' }}>76 (&#13217;) or 3 marla</span>
        </Typography>
        <MySearchField
          className={classes.search}
          fullWidth
          margin="normal"
          variant="outlined"
          placeholder={'Enter Area Here'}
          type="number"
          value={area}
          onChange={(e) => dispatch(setArea(e.target.value))}
          InputProps={{
            classes: { input: classes.input },
            endAdornment: (
              <InputAdornment position="end">
                {area && (
                  <IconButton onClick={() => dispatch(setArea(''))} style={{ padding: 3, margin: '0px 10px 5px 0px' }}>
                    <CancelIcon style={{ color: 'rgba(87, 106, 148, 0.51)' }} />
                  </IconButton>
                )}
              </InputAdornment>
            ),
            startAdornment: (
              <InputAdornment position="start">
                <img
                  style={{ width: '20px', height: '20px', marginLeft: '0.688rem' }}
                  src={Search}
                  className={classes.searchIcon}
                />
              </InputAdornment>
            )
          }}
        />
        <Box className={isMobile ? classes.FooterBox : ''}>{nextButton()}</Box>
      </React.Fragment>
    )
  }

  const desktopView = () => (
    <Grid container>
      <Grid item xs={8} md={6} lg={5}>
        <Box style={{ width: '500px' }}>{getSearchView()}</Box>
      </Grid>
    </Grid>
  )

  const mobileView = () => (
    <Grid item xs={12}>
      <Box>{getSearchView()}</Box>
    </Grid>
  )

  return (
    <Box className={classes.pageBox}>
      <Box className={classes.headerBox}>
        <Header />
      </Box>
      <Divider style={{ position: 'absolute', width: '100%', left: '0 ', background: '#CDD6E9' }} />
      <Box className={classes.contentBox}>{isMobile ? mobileView() : desktopView()}</Box>
    </Box>
  )
}

export default Start
