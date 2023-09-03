import { Box, styled, Typography, useTheme, Switch } from '@material-ui/core'
import React, { useState } from 'react'
import { useMediaQuery } from 'react-responsive'

import MuiAccordion from '@mui/material/Accordion'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import { ITheme } from 'interfaces/shared/ITheme'
import { convertToMillion, numberToText } from '../../utilities'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import { BreakdownItem } from '../../interfaces/quote/IQuote'

export interface IEstimationBreakdown {
  name: string
  price: number
  data: BreakdownItem
}

const EstimationBreakdown: React.FC<IEstimationBreakdown> = (props: IEstimationBreakdown) => {
  const { name, price, data } = props
  const isMobile = useMediaQuery({ query: '(max-width: 960px)' })
  const primaryColor = useTheme<ITheme>().palette.primary.main
  const [enabled, setEnabled] = useState<boolean>(false)

  const handleChange = () => setEnabled(!enabled)

  const Accordion = styled((props) => <MuiAccordion disableGutters elevation={0} square {...props} />)(() => ({}))

  const AccordionSummary = styled((props) => <MuiAccordionSummary {...props} />)(() => ({
    flexDirection: 'row-reverse',
    border: enabled ? `1px solid ${primaryColor} !important` : 'none !important',
    borderRadius: '10px !important',
    padding: '0px 30px !important',
    boxShadow: '0px 4px 20px rgba(177, 176, 176, 0.18)',
    height: isMobile ? '77px' : '70px',
    '& .MuiAccordionSummary-content': {
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }))

  const AccordionDetails = styled(MuiAccordionDetails)(() => ({
    backgroundColor: '#FBFBFB',
    margin: '0px 10px',
    border: '1px solid #CDD6E9',
    boxSizing: 'border-box',
    boxShadow: '0px 4px 20px rgba(177, 176, 176, 0.15)',
    borderRadius: '0px 0px 10px 10px',
    padding: '20px !important'
  }))

  const MyEstimationPrice = styled(Typography)({
    color: '#252A41',
    fontWeight: 800,
    display: 'flex',
    alignItems: 'center',
    justifyContent: isMobile ? 'center' : ''
  })

  const MyEstimationTitle = styled(Typography)({
    fontStyle: 'normal',
    fontWeight: 400,
    color: '#576A94'
  })

  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    '&:active': {
      '& .MuiSwitch-thumb': {
        width: 15
      },
      '& .MuiSwitch-switchBase.Mui-checked': {
        transform: 'translateX(9px)'
      }
    },
    '& .MuiSwitch-switchBase': {
      padding: 2,
      '&.Mui-checked': {
        transform: 'translateX(12px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: primaryColor
        }
      }
    },
    '& .MuiSwitch-thumb': {
      boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(['width'], {
        duration: 200
      })
    },
    '& .MuiSwitch-track': {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: '#CDD6E9',
      boxSizing: 'border-box'
    }
  }))

  const renderTable = () => (
    <TableContainer component={Box}>
      <Table aria-label="My Table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Per Marla Rate</TableCell>
            <TableCell>Unit</TableCell>
            <TableCell>Total Cost</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.breakdown?.length > 0 ? (
            data?.breakdown.map((d: BreakdownItem, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{d.label}</TableCell>
                <TableCell>{d.perMarla}</TableCell>
                <TableCell>{d.unit}</TableCell>
                <TableCell>{d.cost}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} style={{ textAlign: 'center' }}>
                <h6>There is no data to view right now</h6>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )

  const desktopSummary = () => {
    return (
      <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" style={{ pointerEvents: '' }}>
        <Box style={{ display: 'flex', alignItems: 'center' }}>
          <AntSwitch onChange={handleChange} checked={enabled} inputProps={{ 'aria-label': 'ant design' }} />
          <Box>
            <Typography variant="h4" style={{ fontWeight: 600, marginLeft: '30px' }}>
              {name}
            </Typography>
          </Box>
        </Box>
        <Box style={{ display: 'flex' }}>
          <MyEstimationPrice
            style={{
              color: '#252A41'
            }}
            variant={'h4'}>
            {Math.floor(convertToMillion(price))}
            <Typography
              variant={'body1'}
              style={{
                fontWeight: 800,
                fontSize: '11px',
                marginLeft: '0.2rem',
                marginBottom: '0.2rem'
              }}>
              .{convertToMillion(price).toFixed(2).split('.')[1]}
            </Typography>
            <Typography variant={'h3'} style={{ fontWeight: 600, marginLeft: '0.5rem' }}>
              Million PKR
            </Typography>
          </MyEstimationPrice>
        </Box>
      </AccordionSummary>
    )
  }
  const mobileSummary = () => {
    return (
      <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
        <Box style={{ display: 'flex', alignItems: 'center' }}>
          <AntSwitch onChange={handleChange} checked={enabled} inputProps={{ 'aria-label': 'ant design' }} />
          <Box display="grid" style={{ justifyItems: 'flex-start', marginLeft: '22px' }}>
            <Typography variant="h4" style={{ fontWeight: 600 }}>
              {name}
            </Typography>
            <Box flexWrap="wrap" style={{ marginTop: '8px' }}>
              <MyEstimationPrice
                style={{
                  color: '#252A41'
                }}
                variant={'h4'}>
                {Math.floor(convertToMillion(price))}
                <Typography
                  variant={'body1'}
                  style={{
                    fontWeight: 800,
                    fontSize: '11px',
                    marginLeft: '0.2rem',
                    marginBottom: '0.2rem'
                  }}>
                  .{convertToMillion(price).toFixed(2).split('.')[1]}
                </Typography>
                <Typography variant={'h3'} style={{ fontWeight: 600, marginLeft: '0.5rem' }}>
                  Million PKR
                </Typography>
              </MyEstimationPrice>
            </Box>
          </Box>
        </Box>
      </AccordionSummary>
    )
  }

  return (
    <Box>
      <Box style={{ marginTop: '20px' }}>
        <Accordion expanded={enabled} onChange={handleChange}>
          {isMobile ? mobileSummary() : desktopSummary()}
          <AccordionDetails>
            <Box style={{ maxWidth: '790px', display: 'flex', flexDirection: 'column', gap: '25px' }}>
              <MyEstimationTitle variant="h5">
                Price: <span style={{ fontWeight: 600, textDecoration: 'underline' }}>{numberToText(price)}</span>
              </MyEstimationTitle>
              <Typography variant="h4" align="center">
                Breakdown
              </Typography>
              {renderTable()}
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  )
}

export default EstimationBreakdown
