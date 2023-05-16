import { Button, Typography } from '@mui/material'
import { useState } from 'react'
import { Dialog, FormCreate, LoadExcelFile } from '../../components'
import { User } from '../../models'
import { UsersTable } from './components'

const Home = () => {
  const [open, setOpen] = useState(false)
  const [tableData, setTableData] = useState<User[]>([])

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <main className='container'>
      <LoadExcelFile setTableData={setTableData} />
      <Button variant='contained' sx={{ marginBottom: 4 }} onClick={handleOpen}>
        Agregar usuario
      </Button>
      <UsersTable tableData={tableData} setTableData={setTableData} />
      <Dialog title='Crear Usuario' open={open} handleClose={handleClose}>
        <FormCreate setTableData={setTableData} handleClose={handleClose} />
      </Dialog>
      <Typography variant='caption'>
        Doble click en la celda para editar
      </Typography>
    </main>
  )
}

export default Home
