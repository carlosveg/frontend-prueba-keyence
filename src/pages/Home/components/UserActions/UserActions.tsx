import { Check, Delete, Preview, Save } from '@mui/icons-material'
import { Box, CircularProgress, Fab, IconButton, Tooltip } from '@mui/material'
import { green } from '@mui/material/colors'
import { SetStateAction, useEffect, useState } from 'react'
import { deleteUser, updateUser } from '../../../../Services'
import { Dialog, ListDetails } from '../../../../components'
import { User } from '../../../../models'

interface Props {
  user: User
  rowId: string | null
  setRowId: React.Dispatch<SetStateAction<string | null>>
  setTableData: React.Dispatch<SetStateAction<User[]>>
}

const UserActions: React.FC<Props> = ({
  user,
  rowId,
  setRowId,
  setTableData
}) => {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [open, setOpen] = useState(false)
  const currentId = `${user.username}, ${user.date}`

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (rowId === currentId && success) setSuccess(false)
  }, [rowId])

  return (
    <>
      <Tooltip title='Detalles'>
        <IconButton
          aria-label='preview'
          color='primary'
          size='large'
          onClick={handleOpen}
        >
          <Preview />
        </IconButton>
      </Tooltip>
      <Dialog title='Detalles' open={open} handleClose={handleClose}>
        <ListDetails user={user} />
      </Dialog>
      <Tooltip title='Eliminar'>
        <IconButton
          aria-label='delete'
          color='error'
          size='large'
          onClick={() => deleteUser(user.username, user.date, setTableData)}
        >
          <Delete />
        </IconButton>
      </Tooltip>
      <Box sx={{ m: 1, position: 'relative' }}>
        {success ? (
          <Fab
            color='primary'
            sx={{
              width: 40,
              height: 40,
              bgcolor: green[500],
              '&:hover': { bgcolor: green[700] }
            }}
          >
            <Check />
          </Fab>
        ) : (
          <Fab
            color='primary'
            sx={{
              width: 40,
              height: 40
            }}
            disabled={currentId !== rowId || loading}
            onClick={() =>
              updateUser({ user, setLoading, setSuccess, setRowId })
            }
          >
            <Save />
          </Fab>
        )}
        {loading && (
          <CircularProgress
            size={52}
            sx={{
              color: green[500],
              position: 'absolute',
              top: -6,
              left: -6,
              zIndex: 1
            }}
          />
        )}
      </Box>
    </>
  )
}

export default UserActions
