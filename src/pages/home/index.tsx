import React from 'react'
import Header from '../../components/home/header'
import Footer from '../../components/home/footer'
import GetQuote from '../../components/home/getQuote'
import FAQ from '../../components/home/faq'

const Home: React.FC = () => {
  return (
    <React.Fragment>
      <Header />
      <GetQuote />
      <FAQ />
      <Footer />
    </React.Fragment>
  )
}

export default Home
