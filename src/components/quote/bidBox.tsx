import React from 'react'
import { useMediaQuery } from 'react-responsive'
import { Box, styled, Typography, Link, makeStyles, useTheme, withStyles, Tooltip, Button } from '@material-ui/core'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'

import ClickAwayListener from '@material-ui/core/ClickAwayListener'

import { ITheme } from 'interfaces/shared/ITheme'

import Bot from './bot'

const MyEstimationPrice = styled(Typography)({
  color: '#252A41',
  fontWeight: 900,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
})

const MyEstimationContentCenter = styled(Typography)({
  fontStyle: 'normal',
  fontWeight: 400,
  color: '#576A94',
  width: 'fit-content'
})

const StyledTooltip = withStyles({
  tooltip: {
    background: '#E4FCFF',
    fontFamily: 'Montserrat',
    fontWeight: 400,
    lineHeight: 1.5,
    color: '#545464',
    padding: '1rem',
    marginRight: '1rem'
  },
  arrow: {
    color: '#E4FCFF'
  }
})(Tooltip)

export interface IBidBox {
  lowest: number
  highest: number
}

const BidBox: React.FC<IBidBox> = (props) => {
  const { lowest } = props
  const isMobile = useMediaQuery({ query: '(max-width: 960px)' })

  const secondaryColor = useTheme<ITheme>().palette.secondary.main
  const primaryColor = useTheme<ITheme>().palette.primary.main

  const classes = makeStyles(() => {
    return {
      mainbox: { width: isMobile ? '' : '334px' },
      payNowBox: {
        padding: isMobile ? '1.375rem 1.25rem' : '20px',
        marginTop: isMobile ? '22px' : '11px',
        background: '#FFFFFF',
        boxShadow: '0px 4px 20px rgba(177, 176, 176, 0.18)',
        borderRadius: '10px'
      },
      newTooltip: {
        background: secondaryColor
      },
      newArrow: { color: secondaryColor }
    }
  })()

  const StyledLink = styled(Link)({
    '&:hover': { cursor: 'pointer' },
    '&.MuiLink-underlineHover': {
      textDecoration: 'underline'
    },
    '&.MuiTypography-colorPrimary': {
      color: primaryColor
    },
    fontStyle: 'normal',
    fontWeight: 500
  })

  const primaryTextColor = useTheme<ITheme>().text.primary

  const interestButton = () => {
    return (
      <Button
        id="bid"
        onClick={() => null}
        disabled={false}
        color="primary"
        style={{
          width: '100%',
          height: '55px',
          borderRadius: '8px',
          padding: '10px',
          textTransform: 'none'
        }}
        variant="contained">
        <Typography style={{ color: primaryTextColor, fontWeight: 500 }} variant="h5">
          Post Bid
        </Typography>
      </Button>
    )
  }

  const perMonthPerYear = () => {
    return (
      <MyEstimationPrice
        style={{
          color: '#252A41',
          margin: '',
          fontWeight: 900,
          fontSize: ''
        }}
        variant={'h1'}>
        Rs {Math.floor(lowest)}
        <Typography variant={'h3'} style={{ fontWeight: 600, marginLeft: '0.5rem', marginBottom: '1.2rem' }}>
          .{lowest.toFixed(2).split('.')[1]}
        </Typography>
        &nbsp;L
      </MyEstimationPrice>
    )
  }

  return (
    <>
      <Box className={classes.mainbox}>
        <Bot />
        <Box className={classes.payNowBox}>
          <Box style={{ marginTop: '30px' }} display="flex" justifyContent="center">
            <Box>{perMonthPerYear()}</Box>
          </Box>
          <Box style={{ marginTop: isMobile ? '15px' : '20px' }}>
            <ClickAwayListener onClickAway={() => null}>
              <StyledTooltip
                classes={{ tooltip: classes.newTooltip, arrow: classes.newArrow }}
                open={false}
                disableTouchListener
                placement="top"
                title={''}>
                <MyEstimationContentCenter
                  style={{ textDecoration: 'underline', margin: 'auto', cursor: 'pointer' }}
                  variant="body1">
                  {'(incl. taxes & fees)'}
                </MyEstimationContentCenter>
              </StyledTooltip>
            </ClickAwayListener>
          </Box>
          <Box display="flex" justifyContent="center" mt={isMobile ? '22px' : '30px'}>
            <Typography variant="body1">
              Not ready?&nbsp;
              <span>
                <StyledLink id="email-quote-box" onClick={() => null}>
                  {'Email quote and resume later'}
                </StyledLink>
              </span>
            </Typography>
          </Box>
          {!isMobile && (
            <Box display="flex" justifyContent="center" mt="20px">
              {interestButton()}
            </Box>
          )}
        </Box>
        {isMobile && (
          <Box style={{ marginTop: '20px' }}>
            <Bot />
          </Box>
        )}
        <Box style={{ fontSize: '16px', fontWeight: 500, marginTop: '34px' }} display="flex" alignItems="center">
          <Typography variant="h5">How do we estimate your price?</Typography>
          <InfoOutlinedIcon style={{ width: '18px', height: '18px', color: '#7988A9', marginLeft: '8px', cursor: 'pointer' }} />
        </Box>
      </Box>
    </>
  )
}

export default BidBox
