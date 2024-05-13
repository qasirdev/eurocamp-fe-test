import { Box, Typography } from '@mui/material'
import React from 'react'

const NewUserPage = () => {
  return (
    <Box sx={{
      display: "flex",
      justifyContent: "center",
      height: '100vh'
    }}>
      <Typography variant="h4" component="h4">
        NewUserPage - for new user
      </Typography>
    </Box>
  )
}

export default NewUserPage
