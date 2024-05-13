import BookingList from '@/components/BookingList/BookingList'
import { Box, Typography } from '@mui/material'
import { useSearchParams } from 'next/navigation'
import React from 'react'

const BookingsPage = ({searchParams:{userId}}:{searchParams:{userId: string}}) => {
  if(!userId){
    return (
      <Box sx={{
        display: "flex",
        justifyContent: "center",
        height: '100vh'
      }}>
        <Typography variant="h4" component="h4">
          Please select user first
        </Typography>
      </Box>
    )
  }
  return (
    <>
      <BookingList userId={userId}/>
    </>
  )
}

export default BookingsPage
