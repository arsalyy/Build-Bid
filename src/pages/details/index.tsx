import React, { useState } from 'react'
import { Box, makeStyles, Divider, Grid, TextField, useTheme, Typography } from '@material-ui/core'
import { useMediaQuery } from 'react-responsive'
import Header from 'components/shared/header'
import DetailsRadioButtons from 'components/details/detailsRadioButtons'
import DetailsRadioButtonsTripple from 'components/details/detailsRadioButtonsTripple'
import { inputShadowStyle } from '../../utilities'
import { ITheme } from 'interfaces/shared/ITheme'

const Details: React.FC = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 960px)' })
  const [dual, setDual] = useState<string>('yes')
  const [triple, setTriple] = useState<string>('one')
  const [text, setText] = useState<string>('')
  const primaryColor = useTheme<ITheme>().palette.primary.main

  const classes = makeStyles(() => {
    return {
      pageBox: { background: '#FFFFFF', minHeight: '100vh' },
      headerBox: { padding: isMobile ? '0.4rem 1.25rem 0.6rem' : '0.6rem 5.75rem 0.5rem 6.3rem' },
      contentBox: { padding: isMobile ? '2.2rem 1.15rem 1.15rem 1.25rem' : '3.7rem 6.9rem 6rem 6.3rem' },
      MyBox: {
        maxWidth: isMobile ? 'auto' : '525px',
        minWidth: isMobile ? 'auto' : '525px'
      },
      myTextField: {
        marginTop: isMobile ? '2.5rem' : '3.75rem',
        '& .MuiOutlinedInput-root': {
          borderRadius: '10px',
          padding: '2px',
          fontWeight: 500
        },
        '& .MuiInputLabel-root': {
          color: primaryColor
        },
        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: primaryColor
        },
        '& .MuiOutlinedInput-root:focus-within .MuiOutlinedInput-notchedOutline': {
          borderColor: primaryColor
        },
        '& .MuiOutlinedInput-notchedOutline': { borderColor: '#CDD6E9' }
      }
    }
  })()

  return (
    <Box className={classes.pageBox}>
      <Box className={classes.headerBox}>
        <Header />
      </Box>
      <Divider style={{ position: 'absolute', width: '100%', left: '0 ', background: '#CDD6E9' }} />
      <Box className={classes.contentBox}>
        <Grid item sm={12} md={4} lg={4}>
          <Box className={classes.MyBox}>
            <Box>
              <Typography variant="h5">A sample text field question</Typography>
              <TextField
                className={classes.myTextField}
                fullWidth
                style={{ marginTop: '30px' }}
                value={text}
                label=""
                onChange={(event: React.ChangeEvent<{ value: string }>) => setText(event.target.value)}
                inputProps={{ style: inputShadowStyle }}
                variant="outlined"
              />
            </Box>
            <DetailsRadioButtons
              question={'A question with a yes or no answer'}
              handleRadioChange={(event) => setDual(event.target.value)}
              value={dual}
            />
            <DetailsRadioButtonsTripple
              question={'A question with 3 different choices'}
              handleRadioChange={(event) => setTriple(event.target.value)}
              value={triple}
            />
          </Box>
        </Grid>
      </Box>
    </Box>
  )
}

export default Details
