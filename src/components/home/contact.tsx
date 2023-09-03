import React from 'react'
import { makeStyles, Typography, Box } from '@material-ui/core'
import { useMediaQuery } from 'react-responsive'

const ContactUs: React.FC = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 991px)' })

  const classes = makeStyles({
    wrapper: {
      padding: isMobile ? '25px 35px' : '50px 80px',
      backgroundColor: '#ffffff',
      textAlign: 'center'
    },
    card: {
      height: '100%',
      border: '1px solid #e6e8f0',
      display: 'flex',
      position: 'relative',
      width: '-webkit-fill-available',
      marginTop: '80px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      overflow: 'visible',
      boxShadow: '0 15px 30px rgba(48, 54, 77, .1)'
    },
    top: {
      borderTop: '1px #e6e8f0',
      borderBottom: '1px solid #e6e8f0',
      alignItems: 'center',
      padding: '20px 20px 24px',
      display: 'flex',
      textAlign: 'left'
    },
    bottom: {
      color: '#798099',
      textAlign: 'left',
      margin: '20px',
      fontSize: '12px'
    },
    heading: {
      paddingBottom: 0,
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: '20px'
    },
    mail: {
      color: '#5ac0cd',
      letterSpacing: '1.5px',
      textTransform: 'uppercase',
      marginTop: '4px',
      fontSize: '9px',
      fontWeight: 500,
      lineHeight: '16px'
    }
  })()

  return (
    <div className={classes.wrapper}>
      <Typography style={{ color: 'black', fontWeight: 700, marginBottom: '30px' }} variant="subtitle2">
        Contact us
      </Typography>
      <Typography style={{ color: 'black', fontWeight: 400, margin: '0px auto', maxWidth: '500px' }} variant="h5">
        {`Give us a call or drop us a line at any time. Our teams will endeavour to answer all enquiries
        within 24 hours on business days.`}
      </Typography>
      <Box style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '25px' }}>
        <div className={classes.card}>
          <div className={classes.top}>
            <div style={{ padding: '0px 10px' }}>
              <Typography className={classes.heading}>General Enquiries</Typography>
              <a href="mailto:hello@build.bid.co" style={{ textDecoration: 'none' }}>
                <Typography className={classes.mail}>HELLO@BUILD.BID.CO</Typography>
              </a>
            </div>
          </div>
          <div className={classes.bottom}>
            <Typography>
              {`For questions relating to our quote offering, information handling, quote coverage items or anything else, please reach
              out here.`}
            </Typography>
          </div>
        </div>
        <div className={classes.card}>
          <div className={classes.top}>
            <div style={{ padding: '0px 10px' }}>
              <Typography className={classes.heading}>Cancelling your Project</Typography>
              <a href="mailto:support@build.bid.co" style={{ textDecoration: 'none' }}>
                <Typography className={classes.mail}>SUPPORT@BUILD.BID.CO</Typography>
              </a>
            </div>
          </div>
          <div className={classes.bottom}>
            <Typography>
              {`You can cancel your project at any time. Simply email us and tell us your information, reason for cancelling, and
              we'll do the rest for you.`}
            </Typography>
          </div>
        </div>
        <div className={classes.card}>
          <div className={classes.top}>
            <div style={{ padding: '0px 10px' }}>
              <Typography className={classes.heading}>Making a Compliant</Typography>
              <a href="mailto:complaint@build.bid.co" style={{ textDecoration: 'none' }}>
                <Typography className={classes.mail}>COMPLAINT@BUILD.BID.CO</Typography>
              </a>
            </div>
          </div>
          <div className={classes.bottom}>
            <Typography>
              {`If you're unhappy with the service you've received by us or from our quote details, and wish to make a
              complaint, email us here.`}
            </Typography>
          </div>
        </div>
      </Box>
    </div>
  )
}

export default ContactUs
