import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { addUsers } from '@/store/slices/users/usersSlice'
import { RootState } from '@/store/store'
import { User } from '@/types/User'
import { useCallback, useEffect, useState } from 'react'

const useUsers = () => {
  const [users, setUsers] = useState<User[]>([])
  const [isPending, setIsPending] = useState(true)
  const [error, setError] = useState<null | string>(null)
  const dispatch = useAppDispatch();
  const usersInStore = useAppSelector((state:RootState) => state.users )
  
  const fetchAllUsers = useCallback(async () => {
    try {
      const response =  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`);
      const {data} = await response.json();
      return data;        
    } catch (error) {
      setError('fetchAllUsers fetch catch')
    }
  }, []) 
  useEffect(() => {
    try {
      if(users?.length !== 0 ){
        setIsPending(false);
        return;  
      }

      if(usersInStore && usersInStore?.length !=0){
        setIsPending(false);
        setUsers(usersInStore);
        return;
      }

      fetchAllUsers()
      .then((res) => {
        setIsPending(false)
        if(!!res) {
          setUsers(res);
          dispatch(addUsers(res))  
        }
      })
    } catch (error) {
      setIsPending(false)
      setError('users fetch catch')
    }
  }, [dispatch, fetchAllUsers, users?.length, usersInStore])
  
  return { users, isPending, error }
}

export default useUsers
