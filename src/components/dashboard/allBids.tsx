import React, { useState, useEffect } from 'react'
import { Box, makeStyles, useTheme, Typography } from '@material-ui/core'
import axios from 'axios'
import { QUOTE_ENDPOINT } from '../../constants'
import BidCard from '../shared/bidCard'
import CircularProgress from '@mui/material/CircularProgress'
import { ITheme } from 'interfaces/shared/ITheme'
import { useMediaQuery } from 'react-responsive'
import info from '../../images/info.png'

const AllBids: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [quotes, setQuotes] = useState<Array<any>>([])
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
    try {
      const res = await axios.post(`${QUOTE_ENDPOINT}/findMany`)
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
                Oops! There are no currently live projects to bid on, please check back later.
              </Typography>
            </>
          ) : (
            <>
              <img src={info} width={24} height={24} />
              <Typography style={{ fontSize: '1.125rem', fontWeight: 500, marginLeft: '20px' }}>
                Oops! There are no currently live projects to bid on, please check back later.
              </Typography>
            </>
          )}
        </Box>
      ) : (
        <Box className={classes.listWrapper}>
          {quotes.map((quote, index) => (
            <BidCard key={index} quoteId={quote._id} takeInput={true} bidAmount={0} quote={quote} />
          ))}
        </Box>
      )}
    </Box>
  )
}

export default AllBids
