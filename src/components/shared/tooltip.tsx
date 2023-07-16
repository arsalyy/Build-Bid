import React from 'react'
import { useMediaQuery } from 'react-responsive'
import { withStyles, Tooltip, Typography, makeStyles, useTheme } from '@material-ui/core'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'
import { ITheme } from 'interfaces/shared/ITheme'

interface ITooltip {
  title: string
  size?: number
  float?: string
  handleTooltipOpen?(): any
  handleTooltipClose?(): any
  setTooltipOpen?: any
  state?: boolean
  fontSize?: string
}

const StyledTooltip = withStyles({
  tooltip: {
    background: '#E4FCFF',
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 1.5,
    color: '#545464',
    padding: '1rem',
    marginRight: '1rem',
    marginLeft: '1.5rem'
  },
  arrow: {
    color: '#E4FCFF'
  }
})(Tooltip)

const MyTooltip: React.FC<ITooltip> = (props) => {
  const { float, state, size, fontSize } = props
  const isMobile = useMediaQuery({ query: '(max-width: 960px)' })
  const secondaryColor = useTheme<ITheme>().palette.secondary.main
  const secondaryTextColor = useTheme<ITheme>().text.secondary

  const classes = makeStyles(() => {
    return {
      newTooltip: {
        background: secondaryColor
      },
      newArrow: { color: secondaryColor },
      info: {
        cursor: 'pointer',
        float: float ? (float as any) : 'right',
        color: '#7988A9',
        fontSize: size ? size : isMobile ? 15 : 18
      }
    }
  })()

  return (
    <StyledTooltip
      classes={{ tooltip: classes.newTooltip, arrow: classes.newArrow }}
      open={state}
      disableFocusListener
      disableHoverListener
      disableTouchListener
      placement="top"
      interactive={true}
      title={
        <Typography
          style={{ fontSize: isMobile ? fontSize || '0.813rem' : '', color: secondaryTextColor, whiteSpace: 'pre-line' }}
          variant="body1">
          {props.title}
        </Typography>
      }
      arrow>
      <InfoOutlinedIcon className={classes.info} fontSize="small" />
    </StyledTooltip>
  )
}

export default MyTooltip
