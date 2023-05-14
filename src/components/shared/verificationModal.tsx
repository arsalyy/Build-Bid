import React, { useState, useEffect } from 'react'
import { Box, makeStyles, Typography } from '@material-ui/core'
import { useMediaQuery } from 'react-responsive'
import FileUpload, { FileUploadProps } from './fileUpload'
import axios from 'axios'
import { USERS_ENDPOINT } from '../../constants'
import { useSelector, useDispatch } from 'react-redux'
import { setWaiting } from 'actions/userAction'

const VerificationModal: React.FC = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 960px)' })
  const userId = useSelector((state) => state.userReducer.id)
  const dispatch = useDispatch()
  const [error, setError] = useState<boolean>(false)

  useEffect(() => setError(false), [])

  const classes = makeStyles({
    outerBox: {
      position: 'fixed',
      zIndex: 99999,
      paddingTop: '100px',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      overflow: 'auto',
      backdropFilter: 'blur(25px)'
    },
    mainBox: {
      display: isMobile ? 'grid' : 'flex',
      position: 'absolute',
      left: '50%',
      top: '50%',
      zIndex: 999999,
      backgroundColor: '#fff',
      transform: 'translate(-50%, -50%)',
      width: isMobile ? '335px' : '700px',
      borderRadius: '6px'
    },
    rightBox: {
      padding: isMobile ? '30px 20px' : '40px'
    }
  })()

  const uploadFile = async (file) => {
    const formData = new FormData()
    const originalFilename = file.name
    const newFilename = `${userId}-${originalFilename}`
    const renamedFile = new File([file], newFilename, {
      type: file.type
    })
    formData.append('file', renamedFile)
    formData.append('userId', userId)
    await axios
      .post(`${USERS_ENDPOINT}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(() => {
        dispatch(setWaiting(true))
      })
      .catch((error) => {
        console.error('error', error)
        setError(true)
      })
  }

  const fileUploadProp: FileUploadProps = {
    accept: 'image/*',
    onChange: async (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files !== null && event.target?.files?.length > 0) {
        uploadFile(event.target.files[0])
      }
    },
    onDrop: (event: React.DragEvent<HTMLElement>) => {
      if (event.dataTransfer.files !== null && event.dataTransfer?.files?.length > 0) {
        uploadFile(event.dataTransfer.files[0])
      }
    }
  }

  return (
    <Box className={classes.outerBox}>
      <Box className={classes.mainBox}>
        <Box className={classes.rightBox}>
          <Typography style={{ fontSize: '20px', fontWeight: '800', textAlign: isMobile ? 'center' : 'start' }}>
            Almost There
          </Typography>
          <Typography style={{ fontSize: '20px', fontWeight: '800', textAlign: isMobile ? 'center' : 'start' }}>
            Verify your Identity
          </Typography>
          <Typography
            style={{
              fontSize: '13px',
              fontWeight: '500',
              textAlign: isMobile ? 'center' : 'start',
              color: '#545464',
              marginTop: '20px'
            }}>
            As a builder, you&apos;re liable for the construction promises. Therefore we need your identity proof to make sure the
            authenticity. <br />
            Please upload an image of your CNIC
          </Typography>
          <FileUpload {...fileUploadProp} />
          {error && (
            <Typography
              style={{
                fontSize: '13px',
                fontWeight: '500',
                textAlign: isMobile ? 'center' : 'start',
                color: '#ff515d',
                marginTop: '20px'
              }}>
              Something went wrong. Please try again!
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default VerificationModal
