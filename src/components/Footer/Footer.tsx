import { Box, Typography } from '@mui/material'
import React from 'react'

const Footer = () => {
  return (
    <Box sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderTop: "1px solid",
      padding: 2
    }}
    className='footer'
    >
      <p>&copy; <b>Eurocamp</b> is a trading name of Greenbank Holidays Ltd</p>
    </Box>
  )
}

export default Footer
