import { Button, Stack, TextField } from '@mui/material'
import { SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { SnackBar } from '..'
import { User } from '../../models'
import { URL_API } from '../../utils'
import { getUsers } from '../../Services'

interface Props {
  setTableData: React.Dispatch<SetStateAction<User[]>>
  handleClose: () => void
}

const FormCreate: React.FC<Props> = ({ setTableData, handleClose }) => {
  const [open, setOpen] = useState<boolean>(false)
  const [successInserted, setSuccessInserted] = useState<boolean>(false)
  const { handleSubmit, register } = useForm<User>()

  const onSubmit = async (data: User) => {
    const isInserted = await fetch(URL_API, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    if (isInserted.ok) {
      setSuccessInserted(true)
      getUsers(setTableData)
    }
    setOpen(true)
  }

  const handleCloseSnackBar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
    setSuccessInserted(false)
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
        <Stack spacing={2} direction='row' sx={{ marginTop: 4 }}>
          <Stack spacing={2} direction='column' sx={{ marginBottom: 4 }}>
            <TextField
              id='outlined-basic'
              helperText='Username'
              label='Username'
              variant='outlined'
              fullWidth
              required
              {...register('username')}
            />
            <TextField
              type='date'
              helperText='Date'
              id='outlined-basic'
              variant='outlined'
              required
              fullWidth
              {...register('date')}
            />
          </Stack>
          <Stack spacing={2} direction='column'>
            <TextField
              type='time'
              helperText='Punch in'
              id='outlined-basic'
              variant='outlined'
              required
              fullWidth
              {...register('punch_in')}
            />
            <TextField
              type='time'
              helperText='Punch out'
              id='outlined-basic'
              variant='outlined'
              required
              fullWidth
              {...register('punch_out')}
            />
          </Stack>
        </Stack>
        <Stack spacing={2} direction='row'>
          <Button color='error' onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant='contained' type='submit'>
            Guardar
          </Button>
        </Stack>
      </form>
      <SnackBar
        open={open}
        handleClose={handleCloseSnackBar}
        success={successInserted}
      />
    </>
  )
}

export const FormCreateStyle = styled.div`
  /* height: 500px;
  display: grid;
  place-content: center; */
`

export default FormCreate
