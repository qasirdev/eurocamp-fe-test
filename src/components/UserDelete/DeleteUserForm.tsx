'use client'
import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {DeleteUser} from '@/services/users';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addNewUser } from '@/store/slices/users/usersSlice';
import { useRouter } from 'next/navigation';
import { RootState } from '@/store/store';

const DeleteUserForm = ({userId}:{userId: string}) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const usersInStore = useAppSelector((state:RootState) => state.users);

  useEffect(() => {
    if(usersInStore?.length){
      const selectedUser = usersInStore.filter((user) => user.id === userId)[0];
      if(selectedUser){
        setId(selectedUser.id);
        setName(selectedUser.name);
        setEmail(selectedUser.email);
      }
    } else {
      //TODO: fetch user from API instead of store
      //fetchById();
    }
  },[userId, usersInStore])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await DeleteUser(id);
      router.push("/users");     
    } catch (error:any) {
      setError(error.message);
    }
  }
  

  return (
    <Box 
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'start',
        height: '100vh',
      }}
    >
    <form onSubmit={handleSubmit}>
      <h2>Please confirm you want to delete following user:</h2>
      <TextField
        label="user name"
        type="text"
        disabled={true}
        value={name}
        fullWidth
        margin="normal" 
        variant="outlined"
      />
      <TextField
        label="user email"
        type="email"
        value={email}
        disabled={true}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
        Delete
      </Button>
      {error && (
        <Typography color="error" align="center" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
    </form>

  </Box>
  )
}

export default DeleteUserForm
