import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import { User } from '../../models'
import { Button, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

const UsersTable = () => {
  const URL_API = 'http://localhost:3000/users'
  const [tableData, setTableData] = useState<User[]>([])

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(URL_API)
      const data = await response.json()

      setTableData(data)
    }

    getData()
  }, [])

  const columns = [
    {
      field: 'user_id',
      headerName: 'User ID',
      flex: 1,
      width: 50,
      renderCell: (params: GridRenderCellParams) => <div>{params.value}</div>
    },
    {
      field: 'username',
      headerName: 'Username',
      flex: 1,
      width: 50,
      renderCell: (params: GridRenderCellParams) => <div>{params.value}</div>
    },
    {
      field: 'date',
      headerName: 'Date',
      flex: 1,
      width: 50,
      renderCell: (params: GridRenderCellParams) => <div>{params.value}</div>
    },
    {
      field: 'punch_in',
      headerName: 'Punch In',
      flex: 1,
      width: 50,
      renderCell: (params: GridRenderCellParams) => <div>{params.value}</div>
    },
    {
      field: 'punch_out',
      headerName: 'Punch Out',
      flex: 1,
      width: 50,
      renderCell: (params: GridRenderCellParams) => <div>{params.value}</div>
    },
    {
      field: 'actions',
      headerName: '',
      type: 'actions',
      width: 350,
      renderCell: () => (
        <>
          <IconButton aria-label='delete' color='error' size='large'>
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label='delete' color='primary' size='large'>
            <EditIcon />
          </IconButton>
        </>
      )
    }
  ]
  return (
    <main className='container'>
      <DataGrid
        columns={columns}
        rows={tableData}
        getRowId={(row) => row.username}
        pageSizeOptions={[5, 10, 25]}
        initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
      />
    </main>
  )
}

export default UsersTable
