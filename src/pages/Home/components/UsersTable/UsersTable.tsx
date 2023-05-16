import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid'
import { SetStateAction, useEffect, useState } from 'react'
import { getUsers } from '../../../../Services'
import { User } from '../../../../models'
import { UserActions } from '../UserActions'

interface Props {
  tableData: User[]
  setTableData: React.Dispatch<SetStateAction<User[]>>
}

const UsersTable: React.FC<Props> = ({ tableData, setTableData }) => {
  const [rowId, setRowId] = useState<string | null>(null)

  useEffect(() => {
    getUsers(setTableData)
  }, [])

  const columns = [
    {
      field: 'user_id',
      headerName: 'User ID',
      editable: true,
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
      // type: 'date',
      flex: 1,
      width: 50,
      renderCell: (params: GridRenderCellParams) => <div>{params.value}</div>
    },
    {
      field: 'punch_in',
      headerName: 'Punch In',
      flex: 1,
      width: 50,
      editable: true,
      renderCell: (params: GridRenderCellParams) => <div>{params.value}</div>
    },
    {
      field: 'punch_out',
      headerName: 'Punch Out',
      flex: 1,
      width: 50,
      editable: true,
      renderCell: (params: GridRenderCellParams) => <div>{params.value}</div>
    },
    {
      field: 'actions',
      headerName: '',
      type: 'actions',
      sortable: false,
      width: 200,
      editable: true,
      showInMenu: true,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <UserActions
            user={params.row}
            rowId={rowId}
            setRowId={setRowId}
            setTableData={setTableData}
          />
        </>
      )
    }
  ]

  return (
    <>
      <DataGrid
        columns={columns}
        rows={tableData}
        getRowId={(row) => `${row.username}, ${row.date}`}
        pageSizeOptions={[5, 10, 25]}
        initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
        onCellEditStop={(params) =>
          setRowId(`${params.row.username}, ${params.row.date}`)
        }
      />
    </>
  )
}

export default UsersTable
