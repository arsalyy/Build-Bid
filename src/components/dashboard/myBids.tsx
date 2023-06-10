import React, { useState, useEffect } from 'react'
import { Box, makeStyles, useTheme, Typography } from '@material-ui/core'
import axios from 'axios'
import { BID_ENDPOINT } from '../../constants'
import { useSelector } from 'react-redux'
import BidCard from '../shared/bidCard'
import CircularProgress from '@mui/material/CircularProgress'
import { ITheme } from 'interfaces/shared/ITheme'
import { useMediaQuery } from 'react-responsive'
import info from '../../images/info.png'

const MyBids: React.FC = () => {
  const [bids, setBids] = useState<Array<any>>([])
  const [loading, setLoading] = useState<boolean>(true)
  const userId = useSelector((state) => state.userReducer.id)
  const primaryColor = useTheme<ITheme>().palette.primary.main
  const isMobile = useMediaQuery({ query: '(max-width: 960px)' })

  const classes = makeStyles(() => {
    return {
      pageBox: { marginTop: '15px' },
      infoBox: {
        display: 'flex',
        alignItems: 'center',
        background: '#F9F9F9',
        borderRadius: '8px',
        padding: '20px 25px',
        marginTop: '30px',
        position: 'relative'
      },
      typoCover: {
        '& .MuiBox-root': {
          float: isMobile ? 'left' : 'unset'
        }
      },
      listWrapper: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }
    }
  })()

  const callApi = async () => {
    const res = await axios.post(`${BID_ENDPOINT}/myBids`, {
      user: userId
    })
    setBids(res.data['bids'])
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      callApi()
    }, 3000)
  }, [])

  return (
    <Box className={classes.pageBox}>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress sx={{ color: primaryColor }} />
        </Box>
      ) : bids.length <= 0 ? (
        <Box className={classes.infoBox}>
          {isMobile ? (
            <>
              <Typography
                className={classes.typoCover}
                style={{ fontSize: '1.125rem', fontWeight: 500, marginLeft: isMobile ? '' : '20px' }}>
                <img src={info} style={{ marginRight: '5px' }} width={14} height={14} />
                When you will bid on projects, your bid details will all be live here.
              </Typography>
            </>
          ) : (
            <>
              <img src={info} width={24} height={24} />
              <Typography style={{ fontSize: '1.125rem', fontWeight: 500, marginLeft: '20px' }}>
                When you will bid on projects, your bid details will all be live here.
              </Typography>
            </>
          )}
        </Box>
      ) : (
        <Box className={classes.listWrapper}>
          {bids.map((bid, index) => (
            <BidCard key={index} quoteId={bid.quote.id} takeInput={false} bidAmount={bid.amount} />
          ))}
        </Box>
      )}
    </Box>
  )
}

export default MyBids
