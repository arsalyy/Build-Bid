import React from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PhoneIcon from '@mui/icons-material/Phone'
import EmailIcon from '@mui/icons-material/Email'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import GitHubIcon from '@mui/icons-material/GitHub'
import CopyrightIcon from '@mui/icons-material/Copyright'
import { useMediaQuery } from 'react-responsive'
import Logo from '../../images/logo-black.png'
import { Link } from 'react-router-dom'

const Footer: React.FC = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 991px)' })

  return (
    <footer className="footer-distributed">
      <div className="footer-left">
        <h3>
          <img src={Logo} width={'150px'} height={'60px'} alt="Build-Bid" />
        </h3>
        <p className="footer-links">
          <a href="#" className="link-1">
            Home
          </a>
          <a href="/about">About Us</a>
          <a href="/contact">Contact Us</a>
        </p>
        <p className="footer-company-name">
          Build-Bid{' '}
          <span>
            <CopyrightIcon fontSize="small" />
          </span>{' '}
          2023
        </p>
      </div>
      <div className="footer-center">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '35px' }}>
          <div style={{ display: 'flex', gap: '25px', alignItems: 'center', justifyContent: isMobile ? 'center' : 'start' }}>
            <LocationOnIcon fontSize="medium" />
            <p style={{ color: '#798099' }}>
              <span>Johor Town</span> Lahore, Punjab, Pakistan
            </p>
          </div>
          <div style={{ display: 'flex', gap: '25px', alignItems: 'center', justifyContent: isMobile ? 'center' : 'start' }}>
            <PhoneIcon fontSize="medium" />
            <p style={{ color: '#798099' }}>+92 347 060 3867</p>
          </div>
          <div style={{ display: 'flex', gap: '25px', alignItems: 'center', justifyContent: isMobile ? 'center' : 'start' }}>
            <EmailIcon fontSize="medium" />
            <p>
              <a href="mailto:contact@buildbid.com">contact@buildbid.com</a>
            </p>
          </div>
        </div>
      </div>
      <div className="footer-right">
        <p style={{ color: '#798099' }} className="footer-company-about">
          <span style={{ color: '#000000' }}>About the company</span>
          Build-Bid offers a seamless and transparent experience for users seeking to connect with reliable builders. By providing
          instant price quotes and detailed cost analysis, we empower users to make informed decisions.
        </p>
        <div className="footer-icons">
          <Link to="https://facebook.com/" target="_blank">
            <FacebookIcon fontSize="small" />
          </Link>
          <Link to="https://twitter.com/" target="_blank">
            <TwitterIcon fontSize="small" />
          </Link>
          <Link to="https://linkedin.com/" target="_blank">
            <LinkedInIcon fontSize="small" />
          </Link>
          <Link to="https://github.com/" target="_blank">
            <GitHubIcon fontSize="small" />
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
