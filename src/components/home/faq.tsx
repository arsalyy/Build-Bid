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
      heading: 'What is included in the grey structure?',
      content: `Items like foundation, walls, roof, cement, plaster to wall, underground water tank, septic tank are included in the grey structure. Electrical wiring and plumbing are also included in the grey structure, but can be optional.`
    },
    {
      heading: 'How can I be sure that the builders on Build-Bid are reliable?',
      content: `Build-Bid ensures the reliability of builders by verifying their authorization and certification. Only authorized and certified builders are allowed to bid on projects. Additionally, Build-Bid provides user reviews and ratings, allowing you to make an informed decision when selecting a builder.`
    },
    {
      heading: 'How can Build-Bid help me save time and effort during the construction process?',
      content: `Build-Bid eliminates the need for you to meet with multiple builders in person and discuss your ideas individually. By providing all the necessary information online, including instant price quotes and access to reliable builders, Build-Bid streamlines the process, saving you valuable time and effort.`
    },
    {
      heading: 'Can Build-Bid assist me in finding specialized builders for unique construction projects?',
      content: `Build-Bid connects you with a wide network of builders with expertise in various specialized areas, such as eco-friendly construction, historic restoration, or smart home integration. You can specify your requirements, and the platform will match you with builders who have experience in those specific areas.`
    },
    {
      heading: 'How does the bidding feature on Build-Bid benefit me as a user?',
      content: `The bidding feature on Build-Bid allows multiple builders to submit their proposals and cost estimates for your project. This competitive process enables you to compare different options, negotiate prices, and select the best bid that meets your budget and quality expectations.`
    },
    {
      heading: 'Is Build-Bid available in my geographic area?',
      content: `Build-Bid aims to serve customers across various locations. The platform continues to expand its network of builders, and the availability may vary based on your specific region. You can create an account and provide your location to check if Build-Bid is currently available in your area.`
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
