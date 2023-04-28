import React from 'react'
import Header from '../../components/home/header'
import Footer from '../../components/home/footer'
import Mission from 'components/home/mission'
import Company from 'components/home/company'
import Team from 'components/home/team'

const About: React.FC = () => {
  return (
    <React.Fragment>
      <Header />
      <Mission />
      <Company />
      <Team />
      <Footer />
    </React.Fragment>
  )
}

export default About
