import React, { useEffect, useState } from 'react'
import { Box, makeStyles, Typography, useTheme } from '@material-ui/core'
import { useMediaQuery } from 'react-responsive'
import info from '../../images/info.png'
import axios from 'axios'
import { QUOTE_ENDPOINT } from '../../constants'
import { useSelector } from 'react-redux'
import QuoteCard from 'components/shared/quoteCard'
import { ITheme } from 'interfaces/shared/ITheme'
import CircularProgress from '@mui/material/CircularProgress'

const MyQuotes: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [quotes, setQuotes] = useState<Array<any>>([])
  const isMobile = useMediaQuery({ query: '(max-width: 960px)' })
  const userId = useSelector((state) => state.userReducer.id)
  const primaryColor = useTheme<ITheme>().palette.primary.main

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
    try {
      const res = await axios.post(`${QUOTE_ENDPOINT}/myQuotes`, {
        user: userId
      })
      setQuotes(res.data['quotes'])
    } catch (e) {
      console.log(e)
      setQuotes([])
    }
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
      ) : quotes.length <= 0 ? (
        <Box className={classes.infoBox}>
          {isMobile ? (
            <>
              <Typography
                className={classes.typoCover}
                style={{ fontSize: '1.125rem', fontWeight: 500, marginLeft: isMobile ? '' : '20px' }}>
                <img src={info} style={{ marginRight: '5px' }} width={14} height={14} />
                When you have an estimation, your estimation details and their bids will all be live here.
              </Typography>
            </>
          ) : (
            <>
              <img src={info} width={24} height={24} />
              <Typography style={{ fontSize: '1.125rem', fontWeight: 500, marginLeft: '20px' }}>
                When you have an estimation, your estimation details and their bids will all be live here.
              </Typography>
            </>
          )}
        </Box>
      ) : (
        <Box className={classes.listWrapper}>
          {quotes.map((quote, index) => (
            <QuoteCard key={index} quote={quote} callBack={callApi} />
          ))}
        </Box>
      )}
    </Box>
  )
}

export default MyQuotes
