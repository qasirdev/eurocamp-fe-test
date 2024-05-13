'use client'
import useUsers from '@/hooks/useUsers';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import MaterialUiTable from './MaterialUiTable';
import { Box, Button, Typography } from '@mui/material';
import { Router } from 'next/router';
import { useRouter } from 'next/navigation';

const UsersList = () => {
  const { users, isPending:usersIsPending, error } = useUsers();
  const router = useRouter();

  useEffect(() => {
    if (error) {
      void router.push(`/`)
    }
  }, [error, router])

  const usersList = useMemo(() => users, [users]);

  if(usersIsPending){
    return <div>Loading...</div>
  }
  if(error){
    return <div>Error: {error}</div>
  }
  if (!usersList?.length) {
    return <div>Loading..., {usersList?.length}</div>
  }
  
  return (
    <>
      <Box sx={{ 
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
      <Typography variant="h4" component="h4">
        All Users
      </Typography>
      </Box>
        <Button
          variant='outlined' 
          color='success' 
          sx={{ margin: '4px', ml: 4}}
          onClick={() => router.push("/users/new")}
        >
          Add new user
        </Button>
        <MaterialUiTable users={usersList} />    
      </>
    )
}

export default memo(UsersList)
