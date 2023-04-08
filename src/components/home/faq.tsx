import React from 'react'
import Accordion from 'react-bootstrap/Accordion'
import { Typography, makeStyles, styled } from '@material-ui/core'
import { useMediaQuery } from 'react-responsive'

const MyAccordionItem = styled(Accordion.Item)({
  border: 'none !important'
})

const FAQ: React.FC = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 991px)' })

  const classes = makeStyles({
    wrapper: {
      padding: isMobile ? '45px' : '80px',
      backgroundColor: 'white',
      textAlign: 'center'
    },
    itemwrapper: {
      marginBottom: '15px',
      border: '1px solid #e6e8f0 !important'
    },
    banner: {
      color: '#30364d',
      fontWeight: 700,
      maxWidth: '520px',
      margin: '0px auto 50px'
    },
    heading: {
      margin: '10px 20px',
      color: '#30364d',
      fontWeight: 400,
      fontSize: '24px',
      lineHeight: '28px'
    },
    body: {
      margin: '5px 10px',
      color: '#888888',
      fontWeight: 400,
      fontSize: '15px',
      lineHeight: '24px'
    }
  })()

  const faqs = [
    {
      heading: 'Heading # 1',
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
    magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
    },
    {
      heading: 'Heading # 2',
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
    magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
    },
    {
      heading: 'Heading # 3',
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
    magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
    }
  ]

  return (
    <div className={classes.wrapper}>
      <Typography className={classes.banner} variant="h2">
        Commonly asked questions by our customers
      </Typography>
      <Accordion flush>
        {faqs.map((faq, index) => (
          <div key={index} className={classes.itemwrapper}>
            <MyAccordionItem eventKey={`${index}`}>
              <Accordion.Header>
                <Typography className={classes.heading}>{faq.heading}</Typography>
              </Accordion.Header>
              <Accordion.Body>
                <Typography className={classes.body}>{faq.content}</Typography>
              </Accordion.Body>
            </MyAccordionItem>
          </div>
        ))}
      </Accordion>
    </div>
  )
}

export default FAQ
