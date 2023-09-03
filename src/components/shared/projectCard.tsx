import React, { useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import House from '../../images/house.jpg'
import { styled } from '@mui/material/styles'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Box, useTheme } from '@material-ui/core'
import { ITheme } from 'interfaces/shared/ITheme'
import BedOutlinedIcon from '@mui/icons-material/BedOutlined'
import BathtubOutlinedIcon from '@mui/icons-material/BathtubOutlined'
import TimeToLeaveOutlinedIcon from '@mui/icons-material/TimeToLeaveOutlined'
import { useMediaQuery } from 'react-responsive'
import { Table, TableCell, TableContainer, TableHead, TableRow, Paper, TableBody } from '@material-ui/core'
import CancelIcon from '@mui/icons-material/Cancel'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { IQuote } from 'interfaces/quote/IQuote'

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean
}

interface IUser {
  _id: string
  name: string
  email: string
  password: string
  type: string
  verifird: string
  file: string
  waiting: boolean
  identityVerified: boolean
}

interface IBid {
  _id: string
  quote: string
  user: IUser
  amount: number
}

interface IProjectCard {
  bid: IBid
  builder: IUser
  user: IUser
  quote: IQuote
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  // eslint-disable-next-line no-unused-vars
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}))

const ProjectCard: React.FC<IProjectCard> = ({ bid, builder, user, quote }) => {
  const [expanded, setExpanded] = useState<boolean>(false)
  const primaryColor = useTheme<ITheme>().palette.primary.main
  const isMobile = useMediaQuery({ query: '(max-width: 960px)' })

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <Card>
      <Box style={{ display: isMobile ? '' : 'flex', maxHeight: isMobile ? '' : '200px' }}>
        <CardMedia
          component="img"
          sx={{ width: isMobile ? '100%' : 300, height: 256, objectFit: 'fill' }}
          src={House}
          alt="House"
        />
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Box style={{ display: isMobile ? '' : 'flex', justifyContent: 'space-between' }}>
            <Box style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: isMobile ? '100%' : '60%' }}>
              <Typography component="div" variant="h5">
                {quote?.areaInMarla} {' Marla House'}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                Status: <span style={{ color: primaryColor }}>Live</span>
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                Our Estimated Price:{' '}
                <span style={{ color: primaryColor, fontWeight: 'bold' }}>
                  {quote.quote.price.toLocaleString()} {' PKR'}
                </span>
              </Typography>
              <Box style={{ display: 'flex', gap: '15px' }}>
                <Box>
                  <BedOutlinedIcon />
                  {quote?.floorPlan?.bedroom} {' Bed'}
                </Box>
                <Box>
                  <BathtubOutlinedIcon />
                  {quote?.floorPlan?.bathroom} {' Bath'}
                </Box>
                <Box>
                  <TimeToLeaveOutlinedIcon />
                  {quote?.floorPlan?.carParkingSpace} {' Parking'}
                </Box>
              </Box>
            </Box>
            <Box
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: isMobile ? '100%' : '40%',
                marginTop: isMobile ? '20px' : '0px'
              }}>
              <Box>
                <Typography
                  variant="h5"
                  style={{
                    fontWeight: 500
                  }}>
                  Estimation Amount
                </Typography>
                <Typography
                  variant="h4"
                  style={{
                    fontWeight: 'bolder',
                    color: primaryColor
                  }}>
                  {quote?.quote?.price.toLocaleString()} {' PKR'}
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="h5"
                  style={{
                    fontWeight: 500
                  }}>
                  Bid Price
                </Typography>
                <Typography
                  variant="h4"
                  style={{
                    fontWeight: 'bolder',
                    color: primaryColor
                  }}>
                  {bid?.amount.toLocaleString()} {' PKR'}
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Box>
      <CardActions disableSpacing>
        <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <Box>
            <Typography variant="h5" textAlign={'center'}>
              Project&apos;s Builder Details
            </Typography>
            <TableContainer component={Paper} style={{ width: '80%', margin: '0 auto' }}>
              <Table aria-label="My Table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Verified Builder</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{builder.name}</TableCell>
                    <TableCell>{builder.email}</TableCell>
                    <TableCell>
                      {builder.identityVerified ? (
                        <CheckCircleIcon sx={{ color: primaryColor }} />
                      ) : (
                        <CancelIcon sx={{ color: primaryColor }} />
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Box>
            <Typography variant="h5" textAlign={'center'}>
              Project&apos;s Client Details
            </Typography>
            <TableContainer component={Paper} style={{ width: '80%', margin: '0 auto' }}>
              <Table aria-label="My Table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default ProjectCard
