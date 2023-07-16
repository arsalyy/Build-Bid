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
import { Table, TableCell, TableContainer, TableHead, TableRow, Paper, TableBody, Button } from '@material-ui/core'
import CancelIcon from '@mui/icons-material/Cancel'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import axios from 'axios'
import { PROJECT_ENDPOINT } from '../../constants'
import { useToasts } from 'react-toast-notifications'
import { IQuote } from '../../interfaces/quote/IQuote'

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

interface IQuoteCard {
  quote: IQuote & {
    bids: {}[]
  }
  callBack: () => void
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

const QuoteCard: React.FC<IQuoteCard> = ({ quote, callBack }) => {
  const [expanded, setExpanded] = useState<boolean>(false)
  const primaryColor = useTheme<ITheme>().palette.primary.main
  const isMobile = useMediaQuery({ query: '(max-width: 960px)' })
  const { addToast } = useToasts()

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const handleAwardProject = async (bid: IBid) => {
    try {
      const res = await axios.post(`${PROJECT_ENDPOINT}/awardProject`, {
        builder: bid.user._id,
        quote: bid.quote,
        bid: bid._id
      })
      if (res.status === 200) {
        addToast('Project Awarded', { appearance: 'success' })
        callBack()
      }
    } catch {
      addToast('Error Awarding Project. Try Again!', { appearance: 'error' })
    }
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
                {quote.areaInMarla} {' Marla House'}
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
                  Total Bids
                </Typography>
                <Typography
                  variant="h4"
                  style={{
                    fontWeight: 'bolder',
                    color: primaryColor
                  }}>
                  {quote?.bids?.length}
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="h5"
                  style={{
                    fontWeight: 500
                  }}>
                  Lowest Bid
                </Typography>
                <Typography
                  variant="h4"
                  style={{
                    fontWeight: 'bolder',
                    color: primaryColor
                  }}>
                  {(quote.bids[0] as any)?.amount ?? 0}
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
        <CardContent>
          <Typography paragraph textAlign={'center'}>
            Your Estimation Bids
          </Typography>
          <TableContainer component={Paper} style={{ width: '80%', margin: '0 auto' }}>
            <Table aria-label="My Table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Bid Price</TableCell>
                  <TableCell>Verified Builder</TableCell>
                  <TableCell>Award Project</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {quote.bids.length > 0 ? (
                  quote.bids.map((bid: IBid, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{bid.user.name}</TableCell>
                      <TableCell>{bid.user.email}</TableCell>
                      <TableCell>{bid.amount}</TableCell>
                      <TableCell>
                        {bid.user.identityVerified ? (
                          <CheckCircleIcon sx={{ color: primaryColor }} />
                        ) : (
                          <CancelIcon sx={{ color: primaryColor }} />
                        )}
                      </TableCell>
                      <TableCell>
                        <Button color="primary" fullWidth variant="contained" onClick={() => null}>
                          <Typography variant="subtitle1" onClick={() => handleAwardProject(bid)}>
                            Award Project
                          </Typography>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} style={{ textAlign: 'center' }}>
                      <h6>There is no bids on your estimation yet.</h6>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default QuoteCard
