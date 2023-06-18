/* eslint-disable react/prop-types */
import React from 'react'
import { useMediaQuery } from 'react-responsive'

// component import
import Header from '../shared/header'

// material UI Import
import { Divider, styled } from '@material-ui/core'
import { Box, makeStyles, Typography } from '@material-ui/core'
import Loader from '../../images/firstLoader.gif'
import Success from '../../images/secondLoader.gif'

const MyTypography = styled(Typography)({
  fontStyle: 'normal',
  fontWeight: 'bold',
  color: '#252A41'
})

interface ITransition {
  showSecondImage: boolean
}

const Transition: React.FC<ITransition> = ({ showSecondImage }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 960px)' })
  const classes = makeStyles(() => {
    return {
      pageBox: { background: '#FFFFFF', minHeight: '100vh', zIndex: 1300 },
      HeaderWrapper: {
        padding: isMobile ? '0.4rem 1.25rem 0.6rem' : '0.6rem 5.75rem 0.5rem 6.3rem'
      },
      contentBox: {
        padding: isMobile ? '2rem 1.25rem 1.25rem 1.25rem' : '4.7rem 6.9rem 6rem 6.3rem',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column'
      },
      '@keyframes example1': {
        '0%': {
          left: '0px',
          top: '0px'
        },
        '25%': {
          left: '200px',
          top: '0px'
        },
        '75%': {
          left: '100px',
          top: '100px'
        },
        '100%': {
          left: '0px',
          top: '0px'
        }
      },
      '@keyframes example2': {
        '0%': {
          left: '200px',
          top: '0px'
        },
        '25%': {
          left: '100px',
          top: '100px'
        },
        '75%': {
          left: '0px',
          top: '0px'
        },
        '100%': {
          left: '200px',
          top: '0px'
        }
      },
      '@keyframes example3': {
        '0%': {
          left: '100px',
          top: '100px'
        },
        '25%': {
          left: '0px',
          top: '0px'
        },
        '75%': {
          left: '200px',
          top: '0px'
        },
        '100%': {
          left: '100px',
          top: '100px'
        }
      },
      picOne: {
        width: '60px',
        height: '60px',
        position: 'absolute',
        animationName: '$example1',
        animationDuration: '5s',
        animationIterationCount: 'infinite'
      },
      picTwo: {
        width: '60px',
        height: '60px',
        position: 'absolute',
        animationName: '$example2',
        animationDuration: '5s',
        animationIterationCount: 'infinite'
      },
      picThree: {
        width: '60px',
        height: '60px',
        position: 'absolute',
        animationName: '$example3',
        animationDuration: '5s',
        animationIterationCount: 'infinite'
      }
    }
  })()

  return (
    <Box className={classes.pageBox}>
      <Box className={classes.HeaderWrapper}>
        <Header />
      </Box>
      <Divider style={{ position: 'absolute', width: '100%', left: '0 ', background: '#CDD6E9' }} />
      <Box className={classes.contentBox}>
        <Box>
          <img
            width={isMobile ? '250px' : '350px'}
            height={isMobile ? '266px' : '373px'}
            src={showSecondImage ? Success : Loader}
          />
        </Box>
        <Box mt={2}>
          <MyTypography variant="h2" style={{ textAlign: 'center', marginTop: isMobile ? '5px' : '15px' }}>
            Getting you your instant quote ...
          </MyTypography>
        </Box>
      </Box>
    </Box>
  )
}

export default Transition
