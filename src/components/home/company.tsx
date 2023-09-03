import React from 'react'
import { makeStyles, Typography, Box } from '@material-ui/core'
import { useMediaQuery } from 'react-responsive'

const Company: React.FC = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 991px)' })

  const classes = makeStyles({
    wrapper: {
      padding: isMobile ? '25px 35px' : '50px 80px',
      backgroundColor: '#ffffff',
      display: 'flex'
    }
  })()

  return (
    <div className={classes.wrapper}>
      <Box style={{ width: '50%' }}>
        <Typography style={{ color: 'black', fontWeight: 700, marginBottom: '30px' }} variant="subtitle2">
          World&apos;s fastest estimation for home construction
        </Typography>
      </Box>
      <Box style={{ width: '50%' }}>
        <Box style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <Typography style={{ color: 'black', fontWeight: 200, margin: '0px auto' }} variant="h5">
            Build-Bid is an innovative web-based platform that simplifies the construction process by connecting users with
            reliable builders. Our one-stop solution eliminates the need for multiple in-person meetings and streamlines the
            process of obtaining cost estimates. With instant price quotes and detailed cost analysis, users can make informed
            decisions and choose the best builder for their project. We ensure the reliability of builders by verifying their
            authorization and certification. Through our secure platform, users can communicate directly with builders, fostering
            collaboration. Join Build-Bid today and experience a transparent, efficient, and hassle-free construction journey.
          </Typography>
          <Typography style={{ color: 'black', fontWeight: 200, margin: '0px auto' }} variant="h5">
            {`The core strength of Build-Bid is providing quick and efficient cost estimations for residential construction projects
            Build-Bid's ability to provide rapid and accurate cost estimations, ensuring users can make informed decisions and
            progress smoothly with their residential construction projects.`}
          </Typography>
        </Box>
      </Box>
    </div>
  )
}

export default Company
