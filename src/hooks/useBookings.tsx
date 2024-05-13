import { Bookings } from '@/types/Booking'
import React, { useEffect, useState } from 'react'

const useBookings = () => {
  const [bookings, setBookings] = useState<Bookings[]>([])
  const [isPending, setIsPending] = useState(true)
  const [error, setError] = useState<null | string>(null)
  
  const fetchAllBookingByUserId = async () => {
    const response =  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`);
    const {data} = await response.json();
    return data;
  }
  useEffect(() => {
    try {
      fetchAllBookingByUserId()
      .then((res) => {
        setIsPending(false)
        if (res && 'error' in res) {
          setError('Error fetching users')
        } else {
          setBookings(res)
        }
      })
    } catch (error) {
      setIsPending(false)
      setError('users fetch catch')
    }
  }, [])
  return { bookings, isPending, error }
}

export default useBookings
