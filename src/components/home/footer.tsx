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
          <a href="#">Blog</a>
          <a href="#">Pricing</a>
          <a href="#">About</a>
          <a href="#">Faq</a>
          <a href="#">Contact</a>
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
          Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce euismod convallis velit, eu auctor lacus vehicula sit
          amet.
        </p>
        <div className="footer-icons">
          <a href="#">
            <FacebookIcon fontSize="small" />
          </a>
          <a href="#">
            <TwitterIcon fontSize="small" />
          </a>
          <a href="#">
            <LinkedInIcon fontSize="small" />
          </a>
          <a href="#">
            <GitHubIcon fontSize="small" />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
