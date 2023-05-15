import { Alert, Button, Snackbar, Stack, TextField } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { User } from '../../models'

const FormCreate = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [successInserted, setSuccessInserted] = useState<boolean>(false)
  const { handleSubmit, register } = useForm<User>()
  const URL_API = 'http://localhost:3000/users'

  const onSubmit = async (data: User) => {
    console.log(data)

    const isInserted = await fetch(URL_API, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    console.log(isInserted.ok)

    if (isInserted.ok) setSuccessInserted(true)

    setOpen(true)
  }

  const handleClose = (
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
    <FormCreateStyle>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
        <Stack spacing={2} direction='row'>
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
        <Button variant='contained' type='submit'>
          Guardar usuario
        </Button>
      </form>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={`${successInserted ? 'success' : 'error'}`}
          sx={{ width: '100%' }}
        >
          {successInserted
            ? 'Usuario almacenado con éxito!'
            : 'Ocurrió un error!'}
        </Alert>
      </Snackbar>
    </FormCreateStyle>
  )
}

export const FormCreateStyle = styled.div`
  height: 500px;
  display: grid;
  place-content: center;
`

export default FormCreate
