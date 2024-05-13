'use client'
import useBookings from '@/hooks/useBookings';
import React, { useMemo } from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { Button, Fab } from '@mui/material';
import { Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

const BookingList = ({userId}:{userId: string}) => {
  const router = useRouter();
  const { bookings, isPending:bookingsIsPending, error } = useBookings();

  const bookingsList = useMemo(() => {
    if (bookings?.length && userId) {
      return bookings;
      //TODO:Filter on the basis of userId
      // return bookings
      //         .filter((booking) => booking.user === userId);
    }
    return [];
  },[bookings, userId])

  if (bookingsIsPending || error) {
    return <div>Loading...</div>
  }
  if(!bookingsList?.length){
    return <h2>There is no booking for this customer</h2>
  }
  
  return (
    <div>
      <Box sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <Typography variant="h4" component="h4">
          All Bookings
        </Typography>
      </Box> 
      <Button
          variant='outlined' 
          color='success' 
          sx={{ margin: '4px', ml:4}}
          onClick={() => router.push("/bookings/new")}
        >
          Add new Booking
      </Button>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 4,
            flexWrap: "wrap",
            alignItems: "center",
            maxWidth: "1700px",
            justifyContent: "center",
          }}
        >

          {bookingsList.map((booking) => {
              return (
                <Card
                  key={booking.id}
                  sx={{
                    width: "345px",
                    height: "450px",
                    display: "flex",
                    flexDirection: "column",
                  }}>
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: red[500] }} aria-label="booking">
                        B
                      </Avatar>
                    }
                    title="Booking in a beautiful place"
                    subheader={format(booking.bookingdate, 'dd MMM yyyy')}
                  />
                  <CardMedia
                    component="img"
                    height="194"
                    image="https://res.cloudinary.com/eurocamp/image/upload/t_346x195/f_auto/v1693986927/14_DR019_pool_12_natcd6.jpg"
                    alt="booking image"
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {booking.comments}
                    </Typography>
                  </CardContent>
                  <CardActions
                    sx={{
                      display: "flex",
                      alignItems: "flex-end",
                      flexGrow: 1,
                      justifyContent: "flex-end",
                    }}
                  >
                    <Fab size="small" color="primary" aria-label="add">
                      <ArrowForwardIosIcon />
                    </Fab>
                  </CardActions>
                </Card>
              )
            })
          }  
        </Box>
      </Box>
    </div>
  )
}

export default BookingList
