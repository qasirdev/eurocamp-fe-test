'use client'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, TablePagination } from '@mui/material';
import { useRouter } from 'next/navigation';
import {User} from "@/types/User";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  cursor: 'pointer'
}));

const MaterialUiTable = ({users}:{users: User[]}) => {
  const [data, setData] = useState<User[]>([])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const router = useRouter();

  const usersList = useMemo(() => {
    return new Array(...users).sort((a,b) => {
      if(a.name < b.name) { return 1; }
      if(a.name > b.name) { return -1; }
      return 0;
    })
  }, [users]);
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const handleUserSelect = (id: string) => {
    router.push(`/bookings/?userId=${id}`)
  }
  const handleUserDelete = (id: string) => {
    router.push(`/users/${id}/delete`)
  }
  useEffect(() => {
    let data_rev = usersList.slice(page* rowsPerPage, page * rowsPerPage + rowsPerPage)
    if(!(JSON.stringify(data) === JSON.stringify(data_rev))){
      setData(data_rev)
    }
  }, [data, page, rowsPerPage, usersList])

  if(!data?.length){
    return <div>Loading...</div>
  }
  
  return (
    <>
      <TableContainer component={Paper} sx={{height: '100vw'}}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Id</StyledTableCell>
              <StyledTableCell align="right">Name</StyledTableCell>
              <StyledTableCell align="right">email&nbsp;(unique)</StyledTableCell>
              <StyledTableCell align="right">Update</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row" onClick={() => handleUserSelect(row.id)}>
                  {row.id}
                </StyledTableCell>
                <StyledTableCell align="right" onClick={() => handleUserSelect(row.id)}>{row.name}</StyledTableCell>
                <StyledTableCell align="right" onClick={() => handleUserSelect(row.id)}>{row.email}</StyledTableCell>
                <StyledTableCell align="right"><Button onClick={() => handleUserDelete(row.id)}>Delete</Button></StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
            component="div"
            count={users.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[10, 50, { value: -1, label: 'All' }]}
          />
      </TableContainer>
    </>
  )
}

export default memo(MaterialUiTable)
