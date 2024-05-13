'use client'
import React from 'react';
import Typography from '@mui/material/Typography';
import { AppBar, Button, Toolbar } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

export default function Header({ title }: { title: string }) {
  const router = useRouter();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>

        <Button color="inherit" onClick={() => router.push('/')}>
          Home
        </Button>
        <Button color="inherit" 
          onClick={() => router.push('/users')} 
        >
          All Users
        </Button>
        <Button color="inherit" 
          onClick={() => router.push('/parcs')} 
        >
          All Parcs
        </Button>
        <Button color="inherit" onClick={() => router.push('/bookings')}
        >
          All Bookings
        </Button>
      </Toolbar>
    </AppBar>
  );
}
