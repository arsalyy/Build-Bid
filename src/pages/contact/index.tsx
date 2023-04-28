import React from 'react'
import Header from '../../components/home/header'
import Footer from '../../components/home/footer'
import ContactUs from 'components/home/contact'

const Contact: React.FC = () => {
  return (
    <React.Fragment>
      <Header />
      <ContactUs />
      <Footer />
    </React.Fragment>
  )
}

export default Contact
