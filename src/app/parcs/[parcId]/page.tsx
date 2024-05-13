import { Box, Typography } from '@mui/material'
import React from 'react'

const ParcIdPage = () => {
  return (
    <Box sx={{
      display: "flex",
      justifyContent: "center",
      height: '100vh'
    }}>
      <Typography variant="h4" component="h4">
        ParcIdPage - For card of Parc with booking button and update/delete link
      </Typography>
    </Box>
  )
}

export default ParcIdPage
