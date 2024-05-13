'use client'
import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import {newUser} from '@/services/users';
import { useAppDispatch } from '@/store/hooks';
import { addNewUser } from '@/store/slices/users/usersSlice';
import { useRouter } from 'next/navigation';

const NewUserForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleNameChange = e => setName(e.target.value);
  const handleEmailChange = e => setEmail(e.target.value);
  const clearInputs = () => {    
    setName("");
    setEmail("");
    setError("");
}
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!name || !email) {
      setError(`Please enter all required details`);
      return false;
    }
    try {
      const response:any = await newUser(name,email);
      if (response?.statusCode === 502) {
        setError(response.message);
      }
      else {
        clearInputs();
        dispatch(addNewUser(response));
        setMessage('Successfully saved user')
        router.push("/users");

      }            
    } catch (error:any) {
      console.log(error.message)
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
      <h2>Please enter user details:</h2>
      <TextField
        label="user name"
        type="text"
        required
        value={name}
        onChange={handleNameChange}
        fullWidth
        margin="normal" 
        variant="outlined"
      />
      <TextField
        label="user email"
        type="email"
        value={email}
        required
        onChange={handleEmailChange}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
        Submit
      </Button>
      {error && (
        <Typography color="error" align="center" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      {message && (
        <Typography color="green" align="center" sx={{ mt: 2 }}>
          {message}
        </Typography>
      )}
    </form>

  </Box>
  )
}

export default NewUserForm
