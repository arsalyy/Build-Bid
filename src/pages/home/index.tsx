import React from 'react'
import Header from '../../components/home/header'
import Footer from '../../components/home/footer'
import GetQuote from '../../components/home/getQuote'
import FAQ from '../../components/home/faq'
import Banner from '../../components/home/banner'
import Hero from '../../components/home/hero'

const Home: React.FC = () => {
  return (
    <React.Fragment>
      <Header />
      <Banner />
      <Hero />
      <GetQuote />
      <FAQ />
      <Footer />
    </React.Fragment>
  )
}

export default Home
