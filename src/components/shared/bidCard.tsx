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
import { Box, Button, TextField, useTheme, InputAdornment } from '@material-ui/core'
import { ITheme } from 'interfaces/shared/ITheme'
import BedOutlinedIcon from '@mui/icons-material/BedOutlined'
import BathtubOutlinedIcon from '@mui/icons-material/BathtubOutlined'
import TimeToLeaveOutlinedIcon from '@mui/icons-material/TimeToLeaveOutlined'
import { makeStyles } from '@material-ui/styles'
import { useMediaQuery } from 'react-responsive'
import CancelIcon from '@material-ui/icons/Cancel'
import axios from 'axios'
import { BID_ENDPOINT } from '../../constants'
import { useSelector } from 'react-redux'
import { useToasts } from 'react-toast-notifications'
import { IQuote } from 'interfaces/quote/IQuote'

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean
}

interface IBidCard {
  quoteId: string
  quote: IQuote
  takeInput: boolean
  bidAmount: number
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

const MySearchField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: '10px',
    paddingRight: '8px ',
    borderColor: '#CDD6E9'
  }
})

const BidCard: React.FC<IBidCard> = ({ quoteId, takeInput, bidAmount, quote }) => {
  const [expanded] = useState<boolean>(false)
  const [amount, setAmount] = useState<string>()
  const primaryColor = useTheme<ITheme>().palette.primary.main
  const isMobile = useMediaQuery({ query: '(max-width: 960px)' })
  const userId = useSelector((state) => state.userReducer.id)
  const { addToast } = useToasts()

  // const handleExpandClick = () => {
  //   setExpanded(!expanded)
  // }

  const classes = makeStyles(() => {
    return {
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
      }
    }
  })()

  const handleClick = async () => {
    if (!amount) return

    try {
      const res = await axios.post(`${BID_ENDPOINT}/postBid`, {
        user: userId,
        quote: quoteId,
        amount: amount
      })
      if (res.status === 200) addToast('Bid Posted Successfully', { appearance: 'success' })
    } catch {
      return addToast('Error Posting Bid', { appearance: 'error' })
    }
  }

  return (
    <Card>
      <Box style={{ display: isMobile ? '' : 'flex', maxHeight: isMobile ? '' : '200px' }}>
        <CardMedia component="img" sx={{ width: 300, height: 256, objectFit: 'fill' }} src={House} alt="House" />
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
            <Box style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: isMobile ? '100%' : '40%' }}>
              {takeInput ? (
                <>
                  <MySearchField
                    className={classes.search}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    placeholder={'Enter Amount'}
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    InputProps={{
                      classes: { input: classes.input },
                      endAdornment: (
                        <InputAdornment position="end">
                          {amount && (
                            <IconButton onClick={() => setAmount('')} style={{ padding: 3, margin: '0px 10px 5px 0px' }}>
                              <CancelIcon style={{ color: 'rgba(87, 106, 148, 0.51)' }} />
                            </IconButton>
                          )}
                        </InputAdornment>
                      ),
                      startAdornment: (
                        <InputAdornment position="start">
                          <Typography component="div" variant="h6" style={{ marginBottom: '5px' }}>
                            PKR
                          </Typography>
                        </InputAdornment>
                      )
                    }}
                  />
                  <Button
                    id="bid-button"
                    style={{ height: '55px', borderRadius: '8px', textTransform: 'none' }}
                    color="primary"
                    fullWidth
                    variant="contained"
                    onClick={handleClick}>
                    <Typography
                      variant="h5"
                      style={{
                        fontWeight: 500
                      }}>
                      Place Bid
                    </Typography>
                  </Button>
                </>
              ) : (
                <>
                  <Typography
                    variant="h5"
                    style={{
                      fontWeight: 500
                    }}>
                    Your Bid Amount
                  </Typography>
                  <Typography
                    variant="h4"
                    style={{
                      fontWeight: 'bolder',
                      color: primaryColor
                    }}>
                    {bidAmount}
                  </Typography>
                </>
              )}
            </Box>
          </Box>
        </CardContent>
      </Box>
      <CardActions disableSpacing>
        <ExpandMore expand={expanded} onClick={() => null} aria-expanded={expanded} aria-label="show more">
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken, shrimp and
            chorizo, and cook, stirring occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a large plate and
            set aside, leaving chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper,
            and cook, stirring often until thickened and fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2 cups
            chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook without stirring, until most of
            the liquid is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and mussels, tucking them
            down into the rice, and cook again without stirring, until mussels have opened and rice is just tender, 5 to 7 minutes
            more. (Discard any mussels that don&apos;t open.)
          </Typography>
          <Typography>Set aside off of the heat to let rest for 10 minutes, and then serve.</Typography>
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default BidCard
