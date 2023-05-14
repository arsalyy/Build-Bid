import React, { useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import StepperForm from './navigation'
import { Grid, useTheme, Typography, Box, Menu, MenuItem, IconButton, styled, Link, makeStyles } from '@material-ui/core'
import Img from '../../images/headerImg.png'
import Back from '../../images/back.png'
import { ROUTES } from '../../constants'
import { useNavigate, useLocation } from 'react-router-dom'
import { ITheme } from 'interfaces/shared/ITheme'
import notification from '../../images/notification.svg'
import caret from '../../images/caret.svg'
import profileCircle from '../../images/profileCircle.svg'
import logout from '../../images/logout.svg'
import { setUser } from 'actions/userAction'
import { useDispatch, useSelector } from 'react-redux'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'

interface IHeader {
  viewType?: string
}

const MyLink = styled(Link)({
  cursor: 'pointer'
})

const Header: React.FC<IHeader> = (props: IHeader) => {
  const { viewType } = props
  const isMobile = useMediaQuery({ query: '(max-width: 960px)' })
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const primaryColor = useTheme<ITheme>().palette.primary.main
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const name = useSelector((state) => state.userReducer.name)

  const classes = makeStyles(() => {
    return {
      MyBackButton: {
        float: 'left',
        padding: '0px 0px',
        fontWeight: 600,
        ...(isMobile ? { color: '#000000' } : { color: '#576A94' }),
        '&:hover': {
          backgroundColor: 'transparent'
        }
      },
      MyIconsContainer: {
        display: 'flex',
        alignItems: isMobile ? 'center' : '',
        gap: '10px',
        ...(isMobile ? { gap: '0' } : {})
      },
      stepperbox: {
        ...(isMobile
          ? { width: '190px', minWidth: '190px', maxWidth: '190px' }
          : { width: '400px', minWidth: '400px', maxWidth: '400px' })
      },
      power: {
        marginBottom: isMobile ? '-5px' : '0px',
        fontSize: isMobile ? '7px' : '11px',
        fontWeight: 300,
        color: '#576A94'
      },
      menuWrapper: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center'
      },
      menuItem: {
        paddingRight: '30px'
      },
      menuItemPaper: {
        marginRight: '15px'
      },
      menuItemText: {
        fontSize: '0.875rem',
        fontWeight: 500,
        textTransform: 'uppercase',
        color: '#545464'
      },
      menuPaper: {
        padding: '16px 40px 16px'
      },
      caretIcon: {
        padding: isMobile ? '0px 10px' : '0px 10px 7px',
        '&:hover': {
          background: 'rgb(0,0,0,0) !important'
        }
      },
      deskDashboardMenu: {
        '& .MuiPaper-root.MuiMenu-paper.MuiPopover-paper.MuiPaper-elevation8.MuiPaper-rounded': {
          left: 'auto !important',
          width: '230px',
          right: viewType == 'regular' ? (isMobile ? '30px !important' : '100px !important') : '125px !important'
        }
      },
      mobDashboardMenu: {
        '& .MuiPaper-root.MuiMenu-paper.MuiPopover-paper.MuiPaper-elevation8.MuiPaper-rounded': {
          top: '104px !important',
          left: '16px !important',
          width: '100%',
          height: '100%',
          boxShadow: 'none'
        }
      }
    }
  })()

  const onBack = () => {
    const routes = Object.values(ROUTES)
    const index = routes.findIndex((route) => route === location.pathname)
    navigate(routes[index - 1])
  }

  const MobileView = () => {
    return (
      <Box>
        <Box
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            minHeight: '45px'
          }}>
          <IconButton className={classes.MyBackButton} onClick={onBack} disableRipple>
            <img src={Back} style={{ width: '8px', height: '14px', marginTop: '0.5rem' }} />
          </IconButton>
          <Box display="flex" justifyContent="center">
            <Box className={classes.stepperbox}>
              <StepperForm />
            </Box>
          </Box>
          <Box className={classes.MyIconsContainer}>
            <Box mr={0}>
              <Typography className={classes.power}>Powered By</Typography>
              <img src={Img} style={{ width: '50px', height: '10px', marginTop: '5px' }} />
            </Box>
          </Box>
        </Box>
      </Box>
    )
  }

  const DesktopView = () => {
    return (
      <Grid container alignItems="center">
        <Grid item xs={3}>
          <IconButton className={classes.MyBackButton} onClick={onBack} disableRipple>
            <img src={Back} style={{ width: '8px', height: '14px', marginRight: '0.5rem' }} />
            <Typography variant="h5" style={{ color: isMobile ? '#000000' : '#576A94', fontStyle: 'italic', fontWeight: 600 }}>
              Back
            </Typography>
          </IconButton>
        </Grid>
        <Grid item xs={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box display="flex" justifyContent="center">
            <Box className={classes.stepperbox}>
              <StepperForm />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box justifyContent="flex-end" display="flex">
            <Box>
              <Typography className={classes.power}>Powered By</Typography>
              <img src={Img} style={{ width: '100px', height: '15px' }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    )
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const mobileDashboard = () => {
    return (
      <Box
        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
        style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <IconButton
          style={{ padding: '0px' }}
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit">
          {anchorElNav ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
        <Box>
          <MyLink onClick={() => navigate('/')} underline="none">
            <img src="" width={'35px'} height={'35px'} />
          </MyLink>
        </Box>
        <Box>
          <img src={notification} width={'24px'} height={'24px'} />
        </Box>
        <Menu
          className={classes.mobDashboardMenu}
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}>
          <MenuItem onClick={() => navigate('/start')}>
            <Typography>GET INSTANT QUOTE</Typography>
          </MenuItem>
          <MenuItem onClick={handleCloseNavMenu}>
            <img src={profileCircle} style={{ marginRight: '15px' }} width={'22px'} height={'22px'} />
            <Typography>{name}</Typography>
          </MenuItem>
          <MenuItem onClick={pushLogout}>
            <Box className={classes.menuItemPaper}>
              <img src={logout} width={'22px'} height={'22px'} />
            </Box>
            <Typography>Log Out</Typography>
          </MenuItem>
        </Menu>
      </Box>
    )
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const pushLogout = () => {
    dispatch(
      setUser({
        id: '',
        name: '',
        email: '',
        type: '',
        verified: false,
        identityVerified: false,
        waiting: false
      })
    )
    navigate('/')
  }

  const desktopDashboard = () => {
    return (
      <Grid container direction="row" alignItems="center">
        <Grid className={classes.menuWrapper}>
          <Box style={{ float: 'left' }}>
            <MyLink onClick={() => navigate('/')} underline="none">
              <img src="" width={'45px'} height={'45px'} />
            </MyLink>
          </Box>
          <Box style={{ display: 'flex', float: 'right', alignItems: 'center' }}>
            <Box
              className={classes.menuItem}
              style={{ backgroundColor: primaryColor, padding: '10.27px 25px', borderRadius: '5px' }}>
              <Typography
                onClick={() => navigate('/start')}
                className={classes.menuItemText}
                style={{ color: '#fff', cursor: 'pointer' }}>
                Get instant quote
              </Typography>
            </Box>
            <Box className={classes.menuItem} style={{ paddingLeft: '30px' }}>
              <img src={notification} width={'24px'} height={'24px'} />
            </Box>
            <Box>
              <Box style={{ display: 'flex', alignItems: 'center' }}>
                <Typography onClick={handleClick} style={{ cursor: 'pointer' }} className={classes.menuItemText}>
                  <img src={profileCircle} style={{ marginRight: '15px' }} width={'22px'} height={'22px'} />
                  {name}
                </Typography>
                <IconButton
                  id="basic-button"
                  className={classes.caretIcon}
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  disableRipple>
                  <img src={caret} width={'10px'} height={'7px'} />
                </IconButton>
                <Menu
                  className={classes.deskDashboardMenu}
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  style={{
                    marginTop: '66px',
                    marginLeft: '-126px'
                  }}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button'
                  }}>
                  <MenuItem className={classes.menuPaper} style={{ marginBottom: '14px' }} onClick={pushLogout}>
                    <Box className={classes.menuItemPaper}>
                      <img src={logout} width={'22px'} height={'22px'} />
                    </Box>
                    Logout
                  </MenuItem>
                </Menu>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    )
  }

  switch (viewType) {
    case 'dashboard':
      return isMobile ? mobileDashboard() : desktopDashboard()
    default:
      return isMobile ? MobileView() : DesktopView()
  }
}

export default Header
