import React from 'react'
import Header from '../../components/home/header'

const Home: React.FC = () => {
  return (
    <React.Fragment>
      <Header />
      <div style={{ backgroundColor: 'black', width: '100%', height: '100%' }}>Hello</div>
    </React.Fragment>
  )
}

export default Home
