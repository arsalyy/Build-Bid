import { Theme } from '@material-ui/core/styles'

export interface IThemeParams {
  primaryColor?: string
  secondaryColor?: string
  primaryTextColor?: string
  secondaryTextColor?: string
}

export interface ITheme extends Theme {
  text?: {
    primary: string
    secondary: string
  }
  imageSrc?: string
  themeColor?: string
}
