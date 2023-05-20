import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Table, TableBody, styled, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@material-ui/core'
import { ADMIN_ENDPOINT } from '../../constants'
import { Button, Typography } from '@material-ui/core'

interface IData {
  name: string
  email: string
  file: string
}

const Title = styled(Typography)({
  color: '#252A41',
  fontWeight: 600,
  marginTop: '40px',
  lineHeight: 1.75
})

const PageBox = styled(Box)({
  background: '#FFFFFF',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '30px 50px'
})

const AdminTable: React.FC = () => {
  const [data, setData] = useState<Array<IData>>([])

  const getData = async () => {
    const res = await axios.post(`${ADMIN_ENDPOINT}/getPendingBuilders`)
    if (res.status === 200) setData(res.data.data)
  }

  useEffect(() => {
    getData()
  }, [])

  const handleVerify = async (d: IData) => {
    const res = await axios.post(`${ADMIN_ENDPOINT}/verifyBuilder`, {
      email: d.email
    })

    if (res.status === 200) {
      setData(data.filter((da) => da.email !== d.email))
    }
  }

  return (
    <PageBox>
      <Title variant="h1">Verify the Pending Builders</Title>
      <TableContainer component={Paper} style={{ width: '80%', margin: '0 auto' }}>
        <Table aria-label="My Table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>CNIC</TableCell>
              <TableCell>Verify</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((d: IData, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{d.name}</TableCell>
                <TableCell>{d.email}</TableCell>
                <TableCell>
                  <img src={require(`../../../uploads/${d.file}`)} width={'325px'} height={'205px'} />
                </TableCell>
                <TableCell>
                  <Button color="primary" fullWidth variant="contained" onClick={() => handleVerify(d)}>
                    <Typography variant="h5">Verify</Typography>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </PageBox>
  )
}

export default AdminTable
