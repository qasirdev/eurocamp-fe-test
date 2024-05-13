import DeleteUserForm from '@/components/UserDelete/DeleteUserForm'
import React, { useEffect } from 'react'

const UserIdDeletePage = ({params:{userId}}:{
  params: { userId: string }
}) => {
  return (
    <DeleteUserForm userId={userId} />
  )
}

export default UserIdDeletePage
