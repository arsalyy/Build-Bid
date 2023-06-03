import React, { useState, useEffect } from 'react'
import { Box, makeStyles } from '@material-ui/core'
import axios from 'axios'
import { QUOTE_ENDPOINT } from '../../constants'
import BidCard from '../shared/bidCard'

const AllBids: React.FC = () => {
  const [quotes, setQuotes] = useState<Array<any>>([])
  const classes = makeStyles(() => {
    return {
      pageBox: { padding: '10px', display: 'flex', flexDirection: 'column', gap: '20px' }
    }
  })()

  const callApi = async () => {
    const res = await axios.post(`${QUOTE_ENDPOINT}/findMany`)
    setQuotes(res.data['quotes'])
  }

  useEffect(() => {
    callApi()
  }, [])

  return (
    <Box className={classes.pageBox}>
      {quotes.map((_, index) => {
        return <BidCard key={index} />
      })}
    </Box>
  )
}

export default AllBids
