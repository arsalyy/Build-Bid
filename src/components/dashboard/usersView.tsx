import React, { useState } from 'react'
import { Box, makeStyles, Tabs, Tab, Typography } from '@material-ui/core'
import MyQuotes from './myQuotes'
import MyProjects from './myProjects'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

const UsersView: React.FC = () => {
  const [value, setValue] = useState<number>(0)

  const classes = makeStyles(() => {
    return {
      pageBox: { marginTop: '60px' }
    }
  })()

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box className={classes.pageBox}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" textColor="primary" indicatorColor="primary">
          <Tab label="My Quotes" {...a11yProps(0)} />
          <Tab label="My Projects" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <MyQuotes />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <MyProjects />
      </TabPanel>
    </Box>
  )
}

export default UsersView
