import { createTheme } from '@material-ui/core/styles'
import createBreakpoints from '@material-ui/core/styles/createBreakpoints'
import { ITheme } from 'interfaces/shared/ITheme'

const breakpoints = createBreakpoints({})

export const getTheme = (themeParams): ITheme => {
  const {
    primaryColor = '#5AC0CD',
    secondaryColor = '#EEFDFF',
    primaryTextColor = '#FFFFFF',
    secondaryTextColor = '#252A41'
  } = themeParams

  const theme: ITheme = createTheme({
    overrides: {
      MuiInputBase: {
        input: {
          marginLeft: '0.45rem'
        }
      },
      MuiInputLabel: {
        root: {
          // h5 //
          fontSize: '1rem',
          fontWeight: 500,
          [breakpoints.down('xs')]: {
            fontSize: '0.813rem',
            fontWeight: 400
          },
          color: '#CDD6E9 !important',
          '&$focused': {
            color: `${primaryColor} !important`
          }
        },
        shrink: {
          // h6 //
          background: 'white',
          padding: '0 10px 0 8px',
          transform: 'translate(15px, -8px) scale(1) !important',
          fontSize: '0.875rem',
          fontWeight: '400' as any,
          [breakpoints.down('sm')]: {
            fontSize: '0.625rem',
            fontWeight: '400' as any
          }
        }
      },
      MuiButton: {
        root: { boxShadow: 'none' },
        contained: { boxShadow: 'none' }
      },
      MuiOutlinedInput: {
        root: {
          '& $notchedOutline': {
            borderColor: '#cdd6e9 !important'
          },
          '&:hover $notchedOutline': {
            borderColor: `${primaryColor} !important`
          },
          '&$focused $notchedOutline': {
            borderColor: `${primaryColor} !important`
          }
        }
      }
    },
    palette: {
      primary: {
        light: '#757ce8',
        main: primaryColor,
        dark: primaryColor,
        contrastText: '#fff'
      },
      secondary: {
        light: '#ff7961',
        main: secondaryColor,
        dark: secondaryColor,
        contrastText: '#000'
      }
    }
  })

  theme.typography.h1 = {
    fontFamily: 'Montserrat',
    fontSize: '3.125rem',
    [theme.breakpoints.down('xs')]: {
      fontSize: '2.813rem'
    }
  }
  theme.typography.h2 = {
    fontFamily: 'Montserrat',
    fontSize: '1.875rem',
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.25rem'
    }
  }
  theme.typography.h3 = {
    fontFamily: 'Montserrat',
    fontSize: '1.25rem',
    [theme.breakpoints.down('xs')]: {
      fontSize: '1rem'
    }
  }
  theme.typography.h4 = {
    fontFamily: 'Montserrat',
    fontSize: '1.125rem',
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.875rem'
    }
  }
  theme.typography.h5 = {
    fontFamily: 'Montserrat',
    fontSize: '1rem',
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.813rem'
    }
  }
  theme.typography.h6 = {
    fontFamily: 'Montserrat',
    fontSize: '0.875rem',
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.625rem'
    }
  }
  theme.typography.body1 = {
    fontFamily: 'Montserrat',
    fontSize: '0.813rem',
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.75rem'
    }
  }
  theme.typography.body2 = {
    fontFamily: 'Montserrat',
    fontSize: '0.6875rem',
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.6875rem'
    }
  }
  theme.typography.subtitle1 = {
    fontFamily: 'Montserrat',
    fontSize: '2.5rem',
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.5rem'
    }
  }
  theme.typography.subtitle2 = {
    fontFamily: 'Montserrat',
    fontSize: '1.5rem',
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.125rem'
    }
  }

  //custom variables//
  theme.text = {
    primary: primaryTextColor,
    secondary: secondaryTextColor
  }
  theme.imageSrc = '/images/'
  theme.themeColor = '#5AC0CD'
  return theme
}
